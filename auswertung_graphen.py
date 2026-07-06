"""
Auswertung Bachelorarbeit Dark Patterns in Cookie-Bannern
=========================================================
Dieses Skript liest die CSV-Datei mit den Umfrageergebnissen ein, filtert
ungültige Antworten anhand des Attention-Checks und erzeugt alle Grafiken
für die Bachelorarbeit als hochauflösende PNG- und PDF-Dateien.

Benötigte Pakete:
    pip install pandas matplotlib seaborn scipy numpy

Aufruf:
    python "auswertung_graphen.py" "/survey_results_rows.csv"

Die Grafiken werden im Unterordner ./graphen abgelegt.

Diese Anwendung wurde mithilfe von Claude erstellt.
"""

import csv
import json
import os
import sys
import statistics
from collections import Counter

import numpy as np
import pandas as pd
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
from matplotlib.patches import Patch
from scipy import stats


plt.rcParams.update({
    "font.family": "DejaVu Sans",
    "font.size": 10,
    "axes.titlesize": 11,
    "axes.titleweight": "bold",
    "axes.labelsize": 10,
    "axes.spines.top": False,
    "axes.spines.right": False,
    "axes.grid": True,
    "grid.linestyle": "--",
    "grid.alpha": 0.3,
    "figure.dpi": 110,
    "savefig.dpi": 300,
    "savefig.bbox": "tight",
})

COL_A = "#3266ad"  
COL_B = "#c0623d"  
COL_ACCEPT = "#a32d2d"
COL_DENY = "#0F6E56"
COL_GREY = "#73726c"


def load_data(csv_path: str) -> pd.DataFrame:
    """Liest die CSV ein, parst das JSONB-Payload und gibt einen DataFrame zurück."""
    records = []
    with open(csv_path, encoding="utf-8") as f:
        reader = csv.DictReader(f)
        for row in reader:
            try:
                p = json.loads(row["payload"])
            except json.JSONDecodeError:
                continue
            records.append({
                "id": row["id"],
                "group": p["group"],
                "choice": p.get("cookieInteraction", {}).get("choice", ""),
                "bannerTimeMs": p.get("cookieInteraction", {}).get("bannerInteractionTimeMs", 0),
                "micro_trust": p.get("microSurvey", {}).get("trustScore"),
                "micro_respect": p.get("microSurvey", {}).get("respectScore"),
                "macro_steer": p.get("macroSurvey", {}).get("steerScore"),
                "macro_freedom": p.get("macroSurvey", {}).get("freedomScore"),
                "macro_respect": p.get("macroSurvey", {}).get("respectScore"),
                "macro_fairness": p.get("macroSurvey", {}).get("fairnessScore"),
                "macro_aesthetic": p.get("macroSurvey", {}).get("aestheticScore"),
                "macro_professional": p.get("macroSurvey", {}).get("professionalScore"),
                "bannerRead": p.get("recallSurvey", {}).get("bannerRead", ""),
                "recall_reason": p.get("recallSurvey", {}).get("reason", ""),
                "micro_reason": p.get("microSurvey", {}).get("reason", ""),
                "cookieKnowledge": p.get("controlSurvey", {}).get("cookieKnowledge"),
                "timePressureFelt": p.get("controlSurvey", {}).get("timePressureFelt"),
                "cookiePreference": p.get("controlSurvey", {}).get("cookiePreference", ""),
                "cookieEncounterFreq": p.get("controlSurvey", {}).get("cookieEncounterFreq", ""),
                "age": p.get("demographics", {}).get("age"),
                "techSkill": p.get("demographics", {}).get("techSkill"),
                "occupation": p.get("demographics", {}).get("occupation", ""),
                "attention": p.get("attentionCheck", {}).get("attentionAnswer", ""),
                "debug": p.get("wasDebugMode", False),
            })
    df = pd.DataFrame(records)

    n_total = len(df)
    df = df[df["debug"] == False]
    n_after_debug = len(df)
    df = df[df["attention"] == "15°C"]
    n_after_attention = len(df)
    print(f"Stichprobe: Roh n={n_total}, nach Debug-Filter n={n_after_debug}, "
          f"nach Attention-Check n={n_after_attention}")
    return df.reset_index(drop=True)



def normalize_banner_read(value: str) -> str:
    """Vereinheitlicht deutsche und englische Antworten."""
    v = (value or "").lower()
    if "voll" in v or "fully" in v:
        return "vollständig"
    if "teil" in v or "partial" in v:
        return "teilweise"
    if "kein banner" in v:
        return "kein Banner"
    return "gar nicht"


def normalize_preference(value: str) -> str:
    v = (value or "").lower()
    if "ablehnen" in v or "reject" in v:
        return "alles ablehnen"
    if "notwendig" in v or "bestimmt" in v or "specific" in v or "necessary" in v:
        return "nur notwendige"
    if "akzeptieren" in v and "egal" not in v:
        return "alles akzeptieren"
    return "egal"


def normalize_occupation(value: str) -> str:
    v = (value or "").lower()
    if "student" in v:
        return "Student:in"
    if "angestellt" in v or "employ" in v:
        return "Angestellt"
    if "auszu" in v:
        return "Ausbildung"
    if "arbeit" in v:
        return "Arbeitssuchend"
    return "Sonstiges"


def mann_whitney(a: list, b: list) -> dict:
    """Wrapper für Mann-Whitney-U mit Effektgröße r."""
    a = [x for x in a if x is not None]
    b = [x for x in b if x is not None]
    u, p = stats.mannwhitneyu(a, b, alternative="two-sided")
    n1, n2 = len(a), len(b)
    # z-Wert aus Normalapproximation
    mU = n1 * n2 / 2
    sU = np.sqrt(n1 * n2 * (n1 + n2 + 1) / 12)
    z = (u - mU) / sU
    r = abs(z) / np.sqrt(n1 + n2)
    return {"U": u, "z": z, "p": p, "r": r,
            "mean_a": np.mean(a), "mean_b": np.mean(b),
            "sd_a": np.std(a, ddof=1), "sd_b": np.std(b, ddof=1),
            "n_a": n1, "n_b": n2}


OUTDIR = "graphen"
os.makedirs(OUTDIR, exist_ok=True)


def save(fig, name):
    """Speichert eine Figur als PNG und PDF."""
    for ext in ("png", "pdf"):
        path = os.path.join(OUTDIR, f"{name}.{ext}")
        fig.savefig(path)
        print(f"  -> {path}")
    plt.close(fig)


def fig_cookie_choice(df):
    """Abb. 1: Anteil der Cookie-Entscheidungen pro Gruppe."""
    fig, ax = plt.subplots(figsize=(7, 4))
    groups = ["A", "B"]
    choices = ["accept", "deny", "saved_settings"]
    labels = ["Akzeptieren", "Ablehnen", "Einstellungen"]
    colors = [COL_ACCEPT, COL_DENY, COL_GREY]

    bottom = np.zeros(len(groups))
    for choice, label, color in zip(choices, labels, colors):
        vals = [
            (df[df["group"] == g]["choice"].eq(choice).sum() /
             len(df[df["group"] == g])) * 100
            for g in groups
        ]
        ax.bar(groups, vals, bottom=bottom, label=f"{label}",
               color=color, edgecolor="white", width=0.55)
        for i, v in enumerate(vals):
            if v > 4:
                ax.text(i, bottom[i] + v / 2, f"{v:.1f}%",
                        ha="center", va="center", color="white",
                        fontsize=11, fontweight="bold")
        bottom += vals

    group_labels = [f"Gruppe A (manipulativ)\nn={len(df[df['group']=='A'])}",
                    f"Gruppe B (neutral)\nn={len(df[df['group']=='B'])}"]
    ax.set_xticks(range(2))
    ax.set_xticklabels(group_labels)
    ax.set_ylabel("Anteil der Teilnehmenden (%)")
    ax.set_ylim(0, 100)
    ax.set_title("Cookie-Entscheidung nach Experimentalgruppe")
    ax.legend(loc="upper center", bbox_to_anchor=(0.5, -0.15), ncol=3, frameon=False)
    ax.grid(axis="x", visible=False)
    save(fig, "abb_01_cookie_entscheidung")


def fig_banner_time(df):
    """Abb. 2: Verteilung der Banner-Interaktionszeit als Histogramm."""
    fig, ax = plt.subplots(figsize=(7, 4))
    bins = [0, 1, 2, 3, 4, 5, 6, 8, 12]
    labels = ["<1", "1–2", "2–3", "3–4", "4–5", "5–6", "6–8", "8+"]

    for g, col in [("A", COL_A), ("B", COL_B)]:
        sub = df[df["group"] == g]
        times = sub["bannerTimeMs"] / 1000
        counts = np.histogram(times, bins=bins)[0]
        pct = counts / counts.sum() * 100
        x = np.arange(len(labels))
        offset = -0.18 if g == "A" else 0.18
        ax.bar(x + offset, pct, width=0.35, color=col, alpha=0.85,
               edgecolor="white",
               label=f"Gruppe {g}: Median = {times.median():.2f} s")

    ax.set_xticks(np.arange(len(labels)))
    ax.set_xticklabels(labels)
    ax.set_xlabel("Banner-Interaktionszeit (Sekunden)")
    ax.set_ylabel("Anteil der Gruppe (%)")
    ax.set_title("Verteilung der Banner-Interaktionszeit")
    ax.legend(frameon=False)
    save(fig, "abb_02_interaktionszeit")


def fig_banner_read(df):
    """Abb. 3: Wie intensiv wurde das Banner gelesen?"""
    fig, ax = plt.subplots(figsize=(7, 4))
    df = df.copy()
    df["read"] = df["bannerRead"].apply(normalize_banner_read)
    order = ["vollständig", "teilweise", "gar nicht", "kein Banner"]
    x = np.arange(len(order))
    width = 0.38
    for g, offset, col in [("A", -width / 2, COL_A), ("B", width / 2, COL_B)]:
        sub = df[df["group"] == g]
        pct = [sub["read"].eq(o).sum() / len(sub) * 100 for o in order]
        bars = ax.bar(x + offset, pct, width=width, color=col, alpha=0.85,
                      edgecolor="white", label=f"Gruppe {g}")
        for b, v in zip(bars, pct):
            ax.text(b.get_x() + b.get_width() / 2, b.get_height() + 1.2,
                    f"{v:.1f}%", ha="center", fontsize=9, color=col)

    ax.set_xticks(x)
    ax.set_xticklabels(order)
    ax.set_ylabel("Anteil der Gruppe (%)")
    ax.set_ylim(0, max(60, ax.get_ylim()[1]))
    ax.set_title("Selbstauskunft zum Leseverhalten des Banners")
    ax.legend(frameon=False)
    save(fig, "abb_03_lesen")


def fig_macro_overview(df):
    """Abb. 4: Mittelwerte aller Macro-Scores im Vergleich."""
    keys = ["macro_steer", "macro_freedom", "macro_respect",
            "macro_fairness", "macro_aesthetic", "macro_professional"]
    labels = ["Aufmerksamkeits-\nlenkung",
              "Entscheidungs-\nfreiheit",
              "Respekt für\nInteressen",
              "Fairness",
              "Ästhetik",
              "Professionalität"]
    fig, ax = plt.subplots(figsize=(8, 4.2))
    x = np.arange(len(keys))
    width = 0.38

    for g, offset, col in [("A", -width / 2, COL_A), ("B", width / 2, COL_B)]:
        sub = df[df["group"] == g]
        means = [sub[k].mean() for k in keys]
        sd = [sub[k].std(ddof=1) for k in keys]
        bars = ax.bar(x + offset, means, width=width, color=col, alpha=0.85,
                      edgecolor="white", label=f"Gruppe {g}",
                      yerr=sd, capsize=4, error_kw=dict(ecolor=col, alpha=0.4))
        for b, m in zip(bars, means):
            ax.text(b.get_x() + b.get_width() / 2, m + 0.15,
                    f"{m:.2f}", ha="center", fontsize=9, color=col)

    ax.set_xticks(x)
    ax.set_xticklabels(labels, fontsize=9)
    ax.set_ylim(0, 7.5)
    ax.set_yticks(range(1, 8))
    ax.set_ylabel("Mittelwert auf Likert-Skala (1–7)")
    ax.set_title("Bewertung der Banner-Dimensionen nach Aufdeckung (Macro-Survey)")
    ax.legend(frameon=False, loc="upper right")
    ax.axhline(4, linestyle=":", color="grey", alpha=0.5, linewidth=0.8)
    save(fig, "abb_04_macro_overview")


def fig_spillover(df):
    """Abb. 5: Vertrauen vor und nach Aufdeckung."""
    fig, ax = plt.subplots(figsize=(7, 4.2))
    groups = ["A", "B"]
    cols = [COL_A, COL_B]

    for g, col in zip(groups, cols):
        sub = df[df["group"] == g]
        m_pre = sub["micro_respect"].mean()
        m_post = sub["macro_respect"].mean()
        ax.plot([0, 1], [m_pre, m_post], "-o", color=col, linewidth=2.5,
                markersize=10, label=f"Gruppe {g}")
        ax.annotate(f"{m_pre:.2f}", xy=(0, m_pre), xytext=(-0.05, m_pre + 0.12),
                    color=col, fontsize=10, ha="right")
        ax.annotate(f"{m_post:.2f}\n(Δ={m_post - m_pre:+.2f})",
                    xy=(1, m_post), xytext=(1.05, m_post),
                    color=col, fontsize=10, ha="left")

    ax.set_xticks([0, 1])
    ax.set_xticklabels(["Micro-Survey\n(vor Aufdeckung)",
                        "Macro-Survey\n(nach Aufdeckung)"])
    ax.set_ylim(0, 7)
    ax.set_yticks(range(1, 8))
    ax.set_ylabel("Respekt der Nutzerinteressen (1–7)")
    ax.set_title("Spillover-Effekt: Vertrauensveränderung durch Aufdeckung der Manipulation")
    ax.legend(frameon=False)
    ax.set_xlim(-0.4, 1.6)
    save(fig, "abb_05_spillover")


def fig_spillover_dist(df):
    """Abb. 6: Verteilung der Spillover-Richtung."""
    fig, ax = plt.subplots(figsize=(7, 4))
    cats = ["gestiegen", "unverändert", "gesunken"]
    width = 0.38
    x = np.arange(3)

    for g, offset, col in [("A", -width / 2, COL_A), ("B", width / 2, COL_B)]:
        sub = df[df["group"] == g]
        diffs = sub["micro_respect"] - sub["macro_respect"]
        counts = [(diffs < 0).sum(), (diffs == 0).sum(), (diffs > 0).sum()]
        pct = [c / len(diffs) * 100 for c in counts]
        bars = ax.bar(x + offset, pct, width=width, color=col, alpha=0.85,
                      edgecolor="white", label=f"Gruppe {g}")
        for b, v in zip(bars, pct):
            ax.text(b.get_x() + b.get_width() / 2, b.get_height() + 1.2,
                    f"{v:.1f}%", ha="center", fontsize=9, color=col)

    ax.set_xticks(x)
    ax.set_xticklabels(["Vertrauen gestiegen",
                        "Vertrauen unverändert",
                        "Vertrauen gesunken"])
    ax.set_ylabel("Anteil der Gruppe (%)")
    ax.set_title("Richtung des Spillover-Effekts nach Aufdeckung")
    ax.legend(frameon=False)
    save(fig, "abb_06_spillover_richtung")


def fig_freedom_distribution(df):
    """Abb. 7: Verteilung des freedomScore (FF3)."""
    fig, ax = plt.subplots(figsize=(7, 4))
    x = np.arange(1, 8)
    width = 0.38

    for g, offset, col in [("A", -width / 2, COL_A), ("B", width / 2, COL_B)]:
        sub = df[df["group"] == g]
        counts = [(sub["macro_freedom"] == i).sum() for i in x]
        pct = [c / len(sub) * 100 for c in counts]
        ax.bar(x + offset, pct, width=width, color=col, alpha=0.85,
               edgecolor="white",
               label=f"Gruppe {g}: M = {sub['macro_freedom'].mean():.2f}")

    ax.set_xticks(x)
    ax.set_xlabel("freedomScore (1 = keine Freiheit, 7 = volle Freiheit)")
    ax.set_ylabel("Anteil der Gruppe (%)")
    ax.set_title("Wahrgenommene Entscheidungsfreiheit (DSGVO-Indikator)")
    ax.legend(frameon=False)
    save(fig, "abb_07_freedom")


def fig_steer_distribution(df):
    """Abb. 8: Verteilung des steerScore (FF4)."""
    fig, ax = plt.subplots(figsize=(7, 4))
    x = np.arange(1, 8)
    width = 0.38

    for g, offset, col in [("A", -width / 2, COL_A), ("B", width / 2, COL_B)]:
        sub = df[df["group"] == g]
        counts = [(sub["macro_steer"] == i).sum() for i in x]
        pct = [c / len(sub) * 100 for c in counts]
        ax.bar(x + offset, pct, width=width, color=col, alpha=0.85,
               edgecolor="white",
               label=f"Gruppe {g}: M = {sub['macro_steer'].mean():.2f}")

    ax.set_xticks(x)
    ax.set_xlabel("steerScore (1 = keine Lenkung, 7 = starke Lenkung)")
    ax.set_ylabel("Anteil der Gruppe (%)")
    ax.set_title("Wahrgenommene Aufmerksamkeitslenkung (DSA-Indikator)")
    ax.legend(frameon=False)
    save(fig, "abb_08_steering")


def fig_preference_vs_behavior(df):
    """Abb. 9: Präferenz vs. tatsächliche Wahl."""
    fig, axes = plt.subplots(1, 2, figsize=(8, 4))
    for ax, g, col in zip(axes, ["A", "B"], [COL_A, COL_B]):
        sub = df[df["group"] == g]
        sub_pref = sub[sub["cookiePreference"].apply(
            lambda p: normalize_preference(p) in ["alles ablehnen", "nur notwendige"]
        )]
        n = len(sub_pref)
        violated = (sub_pref["choice"] == "accept").sum()
        conformed = n - violated
        sizes = [conformed, violated]
        labels = [f"Präferenzkonform\n{conformed}/{n} ({conformed/n*100:.0f}%)",
                  f"Gegen Präferenz\nakzeptiert\n{violated}/{n} ({violated/n*100:.0f}%)"]
        ax.pie(sizes, labels=labels,
               colors=[COL_DENY, COL_ACCEPT],
               autopct="", startangle=90,
               wedgeprops=dict(edgecolor="white", linewidth=2))
        ax.set_title(f"Gruppe {g}", color=col, fontweight="bold")

    fig.suptitle("Diskrepanz zwischen erklärter Ablehnungspräferenz und tatsächlicher Wahl",
                 fontsize=11, fontweight="bold")
    save(fig, "abb_09_praeferenz_verhalten")


def fig_radar(df):
    """Abb. 10: Radar-Profil aller Macro-Scores."""
    keys = ["macro_steer", "macro_freedom", "macro_respect",
            "macro_fairness", "macro_aesthetic", "macro_professional"]
    labels = ["Aufmerksam-\nkeitslenkung",
              "Entscheidungs-\nfreiheit",
              "Respekt",
              "Fairness",
              "Ästhetik",
              "Professionalität"]
    angles = np.linspace(0, 2 * np.pi, len(keys), endpoint=False).tolist()
    angles += angles[:1]

    fig, ax = plt.subplots(figsize=(6.5, 6.5), subplot_kw=dict(polar=True))

    for g, col in [("A", COL_A), ("B", COL_B)]:
        sub = df[df["group"] == g]
        vals = [sub[k].mean() for k in keys]
        vals += vals[:1]
        ax.plot(angles, vals, "-o", color=col, linewidth=2,
                label=f"Gruppe {g}")
        ax.fill(angles, vals, color=col, alpha=0.15)

    ax.set_xticks(angles[:-1])
    ax.set_xticklabels(labels, fontsize=9)
    ax.set_ylim(0, 7)
    ax.set_yticks([1, 3, 5, 7])
    ax.set_title("Wahrnehmungsprofil der Banner-Designs", pad=22, fontweight="bold")
    ax.legend(loc="upper right", bbox_to_anchor=(1.25, 1.1), frameon=False)
    save(fig, "abb_10_radar")


#Wurde am Ende nicht verwendet, stattdessen Manuell zugeordnet.
def fig_qualitative_categories(df):
    """Abb. 11: Häufigkeit der Begründungskategorien aus den Freitexten."""

    KW = {
        "Zeit/Eile": ["schnellst", "am schnellsten", "eilig", "keine zeit",
                       "umständlich", "schnell ", "wollte die antwort",
                       "wollte die seite"],
        "Gewohnheit/Reflex": ["gewohn", "aus prinzip", "immer", "reflex", "jahre",
                               "ständig", "aus angewohn", "meistens"],
        "Designtäuschung": ["markiert", "auffällig", "farbig", "dachte",
                             "weiter knopf", "versehen", "leichteste",
                             "schnellsten weg", "easiest"],
        "Banner als Hindernis": ["wegklicken", "wegdrücken", "blockiert",
                                  "annoying", "disapear", "disappear",
                                  "seite sehen", "antwort sehen"],
        "Datenschutz-Überzeugung": ["datenschutz", "daten", "tracking", "privacy",
                                     "verfolg", "speich", "sammel",
                                     "nicht haben müssen"],
        "Resignation/Frustration": ["scheiße", "kein bock", "egal", "interessiert",
                                     "nervt", "leid", "glaube nicht", "sicher"],
        "Niederschwelliges Ablehnen": ["gut dass man", "konnte ablehnen",
                                        "einfach abzulehnen", "grau", "gleichfarb",
                                        "andersfarb", "farbe ablesen", "untermenü"],
        "Unkenntnis": ["weiß nicht", "wusste nicht", "nix über", "keine info",
                        "dont know", "nicht mehr"],
    }

    def categorize(text):
        text = (text or "").lower()
        cats = []
        for cat, words in KW.items():
            if any(w in text for w in words):
                cats.append(cat)
        return cats if cats else ["Sonstiges"]

    fig, ax = plt.subplots(figsize=(8, 5.5))
    categories = list(KW.keys()) + ["Sonstiges"]
    y = np.arange(len(categories))
    height = 0.38

    for g, offset, col in [("A", -height / 2, COL_A), ("B", height / 2, COL_B)]:
        sub = df[df["group"] == g]
        total = len(sub)
        counts = {c: 0 for c in categories}
        for txt in sub["recall_reason"]:
            for c in categorize(txt):
                counts[c] += 1
        pct = [counts[c] / total * 100 for c in categories]
        bars = ax.barh(y + offset, pct, height=height, color=col, alpha=0.85,
                       edgecolor="white", label=f"Gruppe {g}")
        for b, v in zip(bars, pct):
            if v > 1:
                ax.text(b.get_width() + 0.6,
                         b.get_y() + b.get_height() / 2,
                         f"{v:.1f}%", va="center", fontsize=9, color=col)

    ax.set_yticks(y)
    ax.set_yticklabels(categories)
    ax.invert_yaxis()
    ax.set_xlabel("Anteil der Begründungen in der Gruppe (%)")
    ax.set_title("Kategorisierung der Freitext-Begründungen (Mehrfachzuordnung möglich)")
    ax.legend(frameon=False, loc="lower right")
    ax.grid(axis="y", visible=False)
    save(fig, "abb_11_freitext_kategorien")


def fig_demographics(df):
    """Abb. 12: Stichprobenbeschreibung mit sechs Panels."""
    fig, axes = plt.subplots(2, 3, figsize=(13, 7.5))

    # Panel 1: Alter
    ax = axes[0, 0]
    ages = df["age"].dropna()
    ax.hist(ages, bins=np.arange(18, 48, 2),
            color=COL_A, alpha=0.85, edgecolor="white")
    ax.set_xlabel("Alter (Jahre)")
    ax.set_ylabel("Anzahl Teilnehmende")
    ax.set_title(f"Altersverteilung\nM = {ages.mean():.1f} · Md = {ages.median():.0f} · "
                 f"SD = {ages.std():.1f}", fontsize=10)
    ax.axvline(ages.median(), color="grey", linestyle="--", linewidth=0.8, alpha=0.7)

    # Panel 2: Beruf
    ax = axes[0, 1]
    occ_counts = df["occupation"].apply(normalize_occupation).value_counts()
    occ_pct = occ_counts / len(df) * 100
    colors_occ = [COL_A, COL_B, COL_DENY, COL_GREY, "#854F0B"][:len(occ_counts)]
    ax.barh(occ_counts.index, occ_pct.values,
            color=colors_occ, alpha=0.85, edgecolor="white")
    for i, (v, p) in enumerate(zip(occ_counts.values, occ_pct.values)):
        ax.text(p + 1.5, i, f"{v} ({p:.1f}%)", va="center", fontsize=9)
    ax.set_xlabel("Anteil (%)")
    ax.set_xlim(0, max(occ_pct) * 1.25)
    ax.set_title("Berufliche Tätigkeit", fontsize=10)
    ax.invert_yaxis()

    
    ax = axes[0, 2]
    ts = df["techSkill"].dropna()
    vals = sorted(ts.unique())
    counts = [(ts == v).sum() for v in vals]
    pct = [c / len(ts) * 100 for c in counts]
    bars = ax.bar(vals, pct, color=COL_A, alpha=0.85, edgecolor="white")
    for b, c, p in zip(bars, counts, pct):
        ax.text(b.get_x() + b.get_width() / 2, b.get_height() + 1,
                f"{p:.1f}%", ha="center", fontsize=9)
    ax.set_xlabel("Selbsteinschätzung Internet-Erfahrung (1–5)")
    ax.set_ylabel("Anteil (%)")
    ax.set_title(f"Technikkompetenz\nM = {ts.mean():.2f} · Md = {int(ts.median())}",
                 fontsize=10)
    ax.set_xticks(vals)

    ax = axes[1, 0]
    ck = df["cookieKnowledge"].dropna()
    vals = list(range(1, 8))
    counts = [(ck == v).sum() for v in vals]
    pct = [c / len(ck) * 100 for c in counts]
    bars = ax.bar(vals, pct, color=COL_B, alpha=0.85, edgecolor="white")
    for b, p in zip(bars, pct):
        if p > 1:
            ax.text(b.get_x() + b.get_width() / 2, b.get_height() + 0.6,
                    f"{p:.1f}%", ha="center", fontsize=8)
    ax.set_xlabel("Cookie-Wissen (1 = sehr gering, 7 = sehr hoch)")
    ax.set_ylabel("Anteil (%)")
    ax.set_title(f"Selbsteinschätzung Cookie-Wissen\n"
                 f"M = {ck.mean():.2f} · Md = {int(ck.median())} · SD = {ck.std():.2f}",
                 fontsize=10)
    ax.set_xticks(vals)

    ax = axes[1, 1]
    prefs = df["cookiePreference"].apply(normalize_preference).value_counts()
    pref_order = ["alles ablehnen", "nur notwendige", "alles akzeptieren", "egal"]
    pref_labels = ["Alles ablehnen", "Nur notwendige", "Alles akzeptieren", "Keine Präferenz"]
    pref_counts = [prefs.get(p, 0) for p in pref_order]
    pref_pct = [c / len(df) * 100 for c in pref_counts]
    pref_colors = [COL_DENY, "#1D9E75", COL_ACCEPT, COL_GREY]
    bars = ax.barh(pref_labels, pref_pct, color=pref_colors,
                   alpha=0.85, edgecolor="white")
    for b, c, p in zip(bars, pref_counts, pref_pct):
        ax.text(p + 1.5, b.get_y() + b.get_height() / 2,
                f"{c} ({p:.1f}%)", va="center", fontsize=9)
    ax.set_xlabel("Anteil (%)")
    ax.set_xlim(0, max(pref_pct) * 1.3)
    ax.set_title("Cookie-Präferenz im Alltag", fontsize=10)
    ax.invert_yaxis()

    ax = axes[1, 2]

    def freq_norm(v):
        v = (v or "").lower()
        if "mehrmals tägl" in v or "multiple times a day" in v:
            return "Mehrmals täglich"
        if "einmal" in v or "once" in v:
            return "Einmal täglich"
        if "mehrmals pro wo" in v or "multiple times a week" in v:
            return "Wöchentlich"
        return "Selten"

    freq = df["cookieEncounterFreq"].apply(freq_norm).value_counts()
    freq_order = ["Mehrmals täglich", "Einmal täglich", "Wöchentlich", "Selten"]
    freq_counts = [freq.get(f, 0) for f in freq_order]
    freq_pct = [c / len(df) * 100 for c in freq_counts]
    bars = ax.barh(freq_order, freq_pct, color=COL_A, alpha=0.85, edgecolor="white")
    for b, c, p in zip(bars, freq_counts, freq_pct):
        if c > 0:
            ax.text(p + 1.5, b.get_y() + b.get_height() / 2,
                    f"{c} ({p:.1f}%)", va="center", fontsize=9)
    ax.set_xlabel("Anteil (%)")
    ax.set_xlim(0, max(freq_pct) * 1.25)
    ax.set_title("Konfrontationshäufigkeit mit Cookie-Bannern", fontsize=10)
    ax.invert_yaxis()

    fig.suptitle(f"Stichprobenbeschreibung (n = {len(df)})",
                 fontweight="bold", fontsize=12)
    fig.tight_layout()
    save(fig, "abb_12_demografie")


def print_statistics(df):
    """Gibt die Gruppenvergleichstabelle für die Bachelorarbeit aus."""
    print("\n\n=== Gruppenvergleiche (Mann-Whitney-U) ===\n")
    print(f"{'Variable':<22} {'M_A':>7} {'M_B':>7} {'Δ':>7} "
          f"{'U':>7} {'z':>6} {'p':>9} {'r':>6}")
    print("-" * 80)
    keys = [
        ("steerScore", "macro_steer"),
        ("fairnessScore", "macro_fairness"),
        ("freedomScore", "macro_freedom"),
        ("professionalScore", "macro_professional"),
        ("respectScore (macro)", "macro_respect"),
        ("respectScore (micro)", "micro_respect"),
        ("aestheticScore", "macro_aesthetic"),
        ("trustScore (micro)", "micro_trust"),
        ("timePressureFelt", "timePressureFelt"),
        ("cookieKnowledge", "cookieKnowledge"),
    ]
    for name, key in keys:
        a = df[df["group"] == "A"][key].dropna().tolist()
        b = df[df["group"] == "B"][key].dropna().tolist()
        r = mann_whitney(a, b)
        sig = ("***" if r["p"] < 0.001 else
               "**" if r["p"] < 0.01 else
               "*" if r["p"] < 0.05 else "n.s.")
        print(f"{name:<22} {r['mean_a']:7.2f} {r['mean_b']:7.2f} "
              f"{r['mean_b'] - r['mean_a']:+7.2f} "
              f"{r['U']:7.0f} {r['z']:6.2f} {r['p']:9.4f} "
              f"{r['r']:6.2f} {sig}")

    # Chi-Quadrat für Cookie-Entscheidung
    print("\n=== Chi-Quadrat: Cookie-Entscheidung x Gruppe ===")
    A_acc = (df[df["group"] == "A"]["choice"] == "accept").sum()
    A_oth = len(df[df["group"] == "A"]) - A_acc
    B_acc = (df[df["group"] == "B"]["choice"] == "accept").sum()
    B_oth = len(df[df["group"] == "B"]) - B_acc
    table = [[A_acc, A_oth], [B_acc, B_oth]]
    chi2, p, dof, exp = stats.chi2_contingency(table)
    n = sum(sum(r) for r in table)
    phi = np.sqrt(chi2 / n)
    odds = (A_acc / A_oth) / (B_acc / B_oth)
    print(f"  Akzeptanzrate Gruppe A: {A_acc}/{A_acc+A_oth} = "
          f"{A_acc/(A_acc+A_oth)*100:.1f}%")
    print(f"  Akzeptanzrate Gruppe B: {B_acc}/{B_acc+B_oth} = "
          f"{B_acc/(B_acc+B_oth)*100:.1f}%")
    print(f"  χ²({dof}) = {chi2:.2f}, p = {p:.4f}, φ = {phi:.3f}, "
          f"Odds Ratio = {odds:.2f}")



def main():
    if len(sys.argv) < 2:
        print("Aufruf: python auswertung_graphen.py <csv-pfad>")
        sys.exit(1)

    df = load_data(sys.argv[1])
    print(f"\nGruppenverteilung: A = {(df['group']=='A').sum()}, "
          f"B = {(df['group']=='B').sum()}")

    print("\nErzeuge Grafiken...")
    fig_cookie_choice(df)
    fig_banner_time(df)
    fig_banner_read(df)
    fig_macro_overview(df)
    fig_spillover(df)
    fig_spillover_dist(df)
    fig_freedom_distribution(df)
    fig_steer_distribution(df)
    fig_preference_vs_behavior(df)
    fig_radar(df)
    fig_qualitative_categories(df)
    fig_demographics(df)

    print_statistics(df)
    print("\nFertig. Alle Grafiken liegen unter ./graphen.")


if __name__ == "__main__":
    main()
