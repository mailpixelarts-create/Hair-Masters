#!/usr/bin/env python3
"""
Generate professional SVG placeholder images for TCF-40 prompts.
These mimic the visual style described in the prompts using abstract SVG graphics,
color themes, and text overlays. Used when AI image generation limit is reached.
"""

import os
import re

# Base directory for images
BASE_DIR = "images/tcf"

# Full prompt data extracted from the MD file
PROMPTS = [
    # Already generated real images (01-10) - skipped in generation
    # HERO
    {"id": 1, "section": "hero", "title": "HERO BACKGROUND", "subtitle": "Honey-blonde flowing hair", "theme": "warm-gold-black", "res": "4000x5000", "ratio": "4:5", "color_desc": "Warm golden honey-blonde hair, matte black, luminous strands"},
    {"id": 2, "section": "hero", "title": "HERO EDITORIAL OVERLAY", "subtitle": "Fingers through platinum blonde", "theme": "cool-platinum-black", "res": "4000x5000", "ratio": "4:5", "color_desc": "Platinum blonde hair, warm side-light, deep black void"},
    # PHILOSOPHY
    {"id": 3, "section": "philosophy", "title": "MOLECULAR ANALYSIS", "subtitle": "Translucent hair strands", "theme": "amber-violet", "res": "4000x4000", "ratio": "1:1", "color_desc": "Amber & violet translucent fibers, scientific macro"},
    {"id": 4, "section": "philosophy", "title": "FORMULA DERIVATION", "subtitle": "Caramel-brown formula flatlay", "theme": "caramel-white", "res": "4000x4000", "ratio": "1:1", "color_desc": "Caramel brown formula, pigment vials: gold, copper, violet, espresso"},
    {"id": 5, "section": "philosophy", "title": "SPECTRAL VERIFICATION", "subtitle": "Prism rainbow spectrum", "theme": "spectral-rainbow", "res": "4000x5000", "ratio": "4:5", "color_desc": "Full rainbow spectrum, single hair strand across black"},
    # GALLERY (real 06-10 generated)
    {"id": 6, "section": "gallery", "title": "HONEY COMB", "subtitle": "Rich honey-blonde balayage", "theme": "warm-gold-black", "res": "2400x3000", "ratio": "4:5", "color_desc": "Warm honey tones, natural dimension"},
    {"id": 7, "section": "gallery", "title": "ESPRESSO SHADOW", "subtitle": "Deep espresso brunette chignon", "theme": "dark-chocolate-black", "res": "2400x3000", "ratio": "4:5", "color_desc": "Rich dark chocolate with warm undertones"},
    {"id": 8, "section": "gallery", "title": "DUSTY ROSE", "subtitle": "Muted sophisticated pink", "theme": "dusty-rose", "res": "2400x3000", "ratio": "4:5", "color_desc": "Muted mauve pink with gray undertones"},
    {"id": 9, "section": "gallery", "title": "MIDNIGHT VIOLET", "subtitle": "Deep midnight violet", "theme": "midnight-violet", "res": "2400x3000", "ratio": "4:5", "color_desc": "Rich violet that reads black in shadow"},
    {"id": 10, "section": "gallery", "title": "COPPER INFUSION", "subtitle": "Vibrant copper-red waves", "theme": "copper-red", "res": "2400x3000", "ratio": "4:5", "color_desc": "Bright penny copper to deep auburn"},
    # REMAINING (to generate as SVG)
    {"id": 11, "section": "gallery", "title": "PLATINUM PROTOCOL", "subtitle": "Icy platinum slicked back", "theme": "icy-platinum", "res": "2400x3000", "ratio": "4:5", "color_desc": "Icy platinum blonde, cool silver, high contrast"},
    {"id": 12, "section": "gallery", "title": "BURGUNDY DEPTH", "subtitle": "Deep burgundy wine hair", "theme": "burgundy-wine", "res": "2400x3000", "ratio": "4:5", "color_desc": "Dark cherry with ruby highlights"},
    {"id": 13, "section": "gallery", "title": "WHEAT GOLD", "subtitle": "Warm wheat-gold natural texture", "theme": "wheat-gold", "res": "2400x3000", "ratio": "4:5", "color_desc": "Golden wheat, honey tones, lived-in waves"},
    {"id": 14, "section": "gallery", "title": "COPPER GLOW", "subtitle": "Long copper-auburn cascade", "theme": "copper-auburn", "res": "2400x3000", "ratio": "4:5", "color_desc": "Rich copper highlights, auburn lowlights"},
    {"id": 15, "section": "gallery", "title": "NEON ROSE", "subtitle": "Vivid magenta-rose bob", "theme": "magenta-rose", "res": "2400x3000", "ratio": "4:5", "color_desc": "Saturated vivid rose, high-fashion"},
    {"id": 16, "section": "gallery", "title": "DARK ESPRESSO", "subtitle": "Moody dark espresso closeup", "theme": "dark-espresso", "res": "2400x3000", "ratio": "4:5", "color_desc": "Low-key moody brown emerging from black"},
    {"id": 17, "section": "gallery", "title": "IVORY PLATINUM", "subtitle": "Warm ivory-platinum hair", "theme": "ivory-platinum", "res": "2400x3000", "ratio": "4:5", "color_desc": "Champagne undertones, luminous ivory"},
    # PROCESS
    {"id": 18, "section": "process", "title": "SCAN", "subtitle": "Spectrophotometer on hair", "theme": "clinical-cool", "res": "2400x3000", "ratio": "4:5", "color_desc": "Clinical device, spectral graph, gloved hand"},
    {"id": 19, "section": "process", "title": "COMPUTE", "subtitle": "Tablet formula calculation", "theme": "clean-white", "res": "2400x3000", "ratio": "4:5", "color_desc": "Minimalist white desk, molecular diagrams"},
    {"id": 20, "section": "process", "title": "FORMULATE", "subtitle": "Mixing copper-brown formula", "theme": "copper-warm", "res": "2400x3000", "ratio": "4:5", "color_desc": "Glossy creamy formula, tint brush"},
    {"id": 21, "section": "process", "title": "APPLY", "subtitle": "Applying color to hair", "theme": "focused-warm", "res": "2400x3000", "ratio": "4:5", "color_desc": "Tint brush on hair section, precise"},
    {"id": 22, "section": "process", "title": "VERIFY", "subtitle": "Match validation", "theme": "clinical-green", "res": "2400x3000", "ratio": "4:5", "color_desc": "Spectrophotometer green match indicator"},
    # BEFORE / AFTER
    {"id": 23, "section": "before-after", "title": "BEFORE PAIR 01", "subtitle": "Dull brassy blonde", "theme": "brassy-dull", "res": "2400x3000", "ratio": "4:5", "color_desc": "Over-processed, uneven, brassy blonde"},
    {"id": 24, "section": "before-after", "title": "AFTER PAIR 01", "subtitle": "Honey-blonde balayage", "theme": "warm-gold", "res": "2400x3000", "ratio": "4:5", "color_desc": "Perfect honey-blonde, glossy waves"},
    {"id": 25, "section": "before-after", "title": "BEFORE PAIR 02", "subtitle": "Flat single-tone brown", "theme": "flat-brown", "res": "2400x3000", "ratio": "4:5", "color_desc": "Washed out dark brown, no dimension"},
    {"id": 26, "section": "before-after", "title": "AFTER PAIR 02", "subtitle": "Copper-auburn dimensional", "theme": "copper-auburn", "res": "2400x3000", "ratio": "4:5", "color_desc": "Rich vibrant copper-auburn"},
    # DETAIL
    {"id": 27, "section": "detail", "title": "TEXTURE CLOSE-UP", "subtitle": "Macro hair strands", "theme": "copper-texture", "res": "4000x4000", "ratio": "1:1", "color_desc": "Rich warm copper strands, individual fibers"},
    {"id": 28, "section": "detail", "title": "THE COLORIST'S HANDS", "subtitle": "Precise application hands", "theme": "natural-hands", "res": "2400x3000", "ratio": "4:5", "color_desc": "Strong elegant hands, tint brush"},
    {"id": 29, "section": "detail", "title": "TOOLS OF THE TRADE", "subtitle": "Tint brush, bowl, vials", "theme": "tools-black", "res": "4000x4000", "ratio": "1:1", "color_desc": "Minimalist tools on matte black"},
    {"id": 30, "section": "detail", "title": "PIGMENT IN MOTION", "subtitle": "Pigment drop in water", "theme": "bloom-copper", "res": "4000x4000", "ratio": "1:1", "color_desc": "Copper pigment bloom in dark water"},
    {"id": 31, "section": "detail", "title": "CUTICLE DETAIL", "subtitle": "Microscopic cuticle scales", "theme": "scientific-cool", "res": "4000x4000", "ratio": "1:1", "color_desc": "Translucent hair cuticle scales"},
    {"id": 32, "section": "detail", "title": "THE FINISH", "subtitle": "Glossy hair touch", "theme": "luminous-finish", "res": "2400x3000", "ratio": "4:5", "color_desc": "Luminous freshly styled hair"},
    # ATMOSPHERE
    {"id": 33, "section": "atmosphere", "title": "THE STUDIO", "subtitle": "Luxury minimalist studio", "theme": "studio-warm", "res": "4000x2500", "ratio": "16:10", "color_desc": "Matte black walls, warm wood, styling chair"},
    {"id": 34, "section": "atmosphere", "title": "LIGHT AND SHADOW", "subtitle": "Geometric shadow pattern", "theme": "shadow-gold", "res": "4000x5000", "ratio": "4:5", "color_desc": "Warm golden light on matte black"},
    {"id": 35, "section": "atmosphere", "title": "PRODUCT VIGNETTE", "subtitle": "Hair color tube + bowl", "theme": "luxury-product", "res": "4000x4000", "ratio": "1:1", "color_desc": "Elegant minimal product tube, copper formula"},
    {"id": 36, "section": "atmosphere", "title": "THE RITUAL", "subtitle": "Color swatch comparison", "theme": "intimate-warm", "res": "2400x3000", "ratio": "4:5", "color_desc": "Swatch book and hair matching"},
    # CTA
    {"id": 37, "section": "cta", "title": "THE INVITATION", "subtitle": "Direct gaze welcome", "theme": "inviting-warm", "res": "2400x3000", "ratio": "4:5", "color_desc": "Honey-blonde, welcoming gesture"},
    {"id": 38, "section": "cta", "title": "BOOKING MOMENT", "subtitle": "Writing on appointment card", "theme": "clean-booking", "res": "2400x3000", "ratio": "4:5", "color_desc": "Elegant hand writing on white card"},
    # FOOTER
    {"id": 39, "section": "footer", "title": "BRAND SIGNATURE", "subtitle": "Coiled copper-gold strand", "theme": "signature-gold", "res": "4000x4000", "ratio": "1:1", "color_desc": "Perfect circle of luminous copper-gold hair"},
    # MOBILE
    {"id": 40, "section": "mobile", "title": "MOBILE HERO", "subtitle": "Vertical crop honey-blonde", "theme": "warm-gold-black", "res": "2400x4267", "ratio": "9:16", "color_desc": "Flowing honey-blonde hair vertical, immersive"},
]

THEME_COLORS = {
    "warm-gold-black": {"bg": "#0a0a0a", "accent": "#d4af37", "accent2": "#f5d78a", "text": "#f5f5f5"},
    "cool-platinum-black": {"bg": "#111111", "accent": "#e8e8e8", "accent2": "#b8c4d4", "text": "#f0f0f0"},
    "amber-violet": {"bg": "#1a1423", "accent": "#c98a3f", "accent2": "#7b6cb0", "text": "#e8e0d0"},
    "caramel-white": {"bg": "#f8f5f0", "accent": "#8c6642", "accent2": "#c9a66b", "text": "#2c2520"},
    "spectral-rainbow": {"bg": "#0d0d0d", "accent": "#ff4d4d", "accent2": "#4da6ff", "text": "#ffffff"},
    "dark-chocolate-black": {"bg": "#111111", "accent": "#4a2f1f", "accent2": "#8c6642", "text": "#e8e0d0"},
    "dusty-rose": {"bg": "#1f1a1e", "accent": "#b38a8f", "accent2": "#d9b8bc", "text": "#f0e8e5"},
    "midnight-violet": {"bg": "#0f0c18", "accent": "#5c3d7a", "accent2": "#9b6eb8", "text": "#e8e0f0"},
    "copper-red": {"bg": "#0f0a08", "accent": "#c45c2a", "accent2": "#e88a5a", "text": "#f5e8d8"},
    "icy-platinum": {"bg": "#0a0f14", "accent": "#d6e0e8", "accent2": "#a8c4d4", "text": "#f0f4f8"},
    "burgundy-wine": {"bg": "#120a0f", "accent": "#6b2a3f", "accent2": "#a64a5f", "text": "#f5e0e5"},
    "wheat-gold": {"bg": "#0c0a08", "accent": "#c9a25c", "accent2": "#e8d49a", "text": "#f5f0e0"},
    "copper-auburn": {"bg": "#0a0806", "accent": "#9c4d2a", "accent2": "#d46c3a", "text": "#f0d8c0"},
    "magenta-rose": {"bg": "#140d12", "accent": "#c23a6e", "accent2": "#e86d9e", "text": "#f8e8f0"},
    "dark-espresso": {"bg": "#080604", "accent": "#3c2a20", "accent2": "#6b4c38", "text": "#d8c8b0"},
    "ivory-platinum": {"bg": "#11140f", "accent": "#e8d8c8", "accent2": "#c8b8a0", "text": "#f8f4f0"},
    "clinical-cool": {"bg": "#f0f4f8", "accent": "#3a5a7a", "accent2": "#5a8ab8", "text": "#1a2a3a"},
    "clean-white": {"bg": "#f8f8f5", "accent": "#4a5a6a", "accent2": "#7a9ab0", "text": "#1f2a35"},
    "copper-warm": {"bg": "#0a0705", "accent": "#8c4f2c", "accent2": "#c97a4a", "text": "#f5e8d5"},
    "focused-warm": {"bg": "#12100c", "accent": "#9c5f35", "accent2": "#d48a55", "text": "#f0e0c8"},
    "clinical-green": {"bg": "#f4f8f4", "accent": "#2a6a42", "accent2": "#4a9a6a", "text": "#1a2f20"},
    "brassy-dull": {"bg": "#1c1915", "accent": "#a68a5a", "accent2": "#c9a87a", "text": "#d8d0c0"},
    "warm-gold": {"bg": "#0a0805", "accent": "#c99f4c", "accent2": "#e8c87a", "text": "#f5f0e0"},
    "flat-brown": {"bg": "#14110e", "accent": "#4a3a2f", "accent2": "#7a5c48", "text": "#c8b8a0"},
    "copper-texture": {"bg": "#0a0704", "accent": "#a65c2a", "accent2": "#d47a4a", "text": "#f8e8d0"},
    "natural-hands": {"bg": "#0f0c0a", "accent": "#8c6642", "accent2": "#b88a65", "text": "#e8d8c0"},
    "tools-black": {"bg": "#0a0a0a", "accent": "#d4af37", "accent2": "#8c6642", "text": "#f0f0f0"},
    "bloom-copper": {"bg": "#0a0a12", "accent": "#9c5a2a", "accent2": "#d47a4a", "text": "#f5e0c8"},
    "scientific-cool": {"bg": "#101820", "accent": "#5a8ab8", "accent2": "#9ab8d4", "text": "#e0e8f0"},
    "luminous-finish": {"bg": "#0d0a08", "accent": "#d4af37", "accent2": "#f5d78a", "text": "#f5f0e8"},
    "studio-warm": {"bg": "#12100d", "accent": "#8c6642", "accent2": "#c9a66b", "text": "#e8e0d0"},
    "shadow-gold": {"bg": "#0a0805", "accent": "#d4af37", "accent2": "#f5d78a", "text": "#f5f0e8"},
    "luxury-product": {"bg": "#0a0a0a", "accent": "#c45c2a", "accent2": "#e88a5a", "text": "#f0f0f0"},
    "intimate-warm": {"bg": "#120f0c", "accent": "#8c6642", "accent2": "#b88a65", "text": "#f0e8d8"},
    "inviting-warm": {"bg": "#0c0a08", "accent": "#c99f4c", "accent2": "#e8c87a", "text": "#f5f0e8"},
    "clean-booking": {"bg": "#f8f5f0", "accent": "#2a3a4a", "accent2": "#5a7a9a", "text": "#1a252f"},
    "signature-gold": {"bg": "#0a0a0a", "accent": "#d4af37", "accent2": "#f5d78a", "text": "#f5f0e8"},
}

def create_svg(prompt):
    theme_key = prompt["theme"]
    colors = THEME_COLORS.get(theme_key, THEME_COLORS["warm-gold-black"])
    
    # Determine size based on ratio
    if prompt["ratio"] == "9:16":
        w, h = 900, 1600
    elif prompt["ratio"] == "16:10":
        w, h = 1440, 900
    elif prompt["ratio"] == "1:1":
        w, h = 1200, 1200
    else:
        w, h = 960, 1200  # 4:5 default
    
    bg = colors["bg"]
    accent = colors["accent"]
    accent2 = colors["accent2"]
    text_col = colors["text"]
    
    # Create abstract hair-like elements based on theme
    hair_elements = ""
    
    if "gold" in theme_key or "copper" in theme_key or "honey" in theme_key.lower() or "wheat" in theme_key:
        # Warm flowing waves
        hair_elements = f"""
        <!-- Warm flowing hair strands -->
        <path d="M{w*0.3} {h*0.25} Q{w*0.25} {h*0.45} {w*0.38} {h*0.7}" fill="none" stroke="{accent}" stroke-width="18" stroke-opacity="0.85"/>
        <path d="M{w*0.38} {h*0.22} Q{w*0.33} {h*0.48} {w*0.45} {h*0.75}" fill="none" stroke="{accent2}" stroke-width="14" stroke-opacity="0.9"/>
        <path d="M{w*0.42} {h*0.28} Q{w*0.48} {h*0.5} {w*0.35} {h*0.78}" fill="none" stroke="{accent}" stroke-width="12" stroke-opacity="0.75"/>
        <path d="M{w*0.52} {h*0.2} Q{w*0.55} {h*0.42} {w*0.58} {h*0.68}" fill="none" stroke="{accent2}" stroke-width="22" stroke-opacity="0.65"/>
        """
    elif "platinum" in theme_key or "ivory" in theme_key:
        # Sleek cool straight + highlights
        hair_elements = f"""
        <path d="M{w*0.32} {h*0.15} L{w*0.28} {h*0.85}" fill="none" stroke="{accent}" stroke-width="28" stroke-opacity="0.6"/>
        <path d="M{w*0.38} {h*0.18} L{w*0.35} {h*0.82}" fill="none" stroke="{accent2}" stroke-width="18" stroke-opacity="0.85"/>
        <path d="M{w*0.45} {h*0.12} L{w*0.42} {h*0.88}" fill="none" stroke="#ffffff" stroke-width="9" stroke-opacity="0.5"/>
        """
    elif "violet" in theme_key or "rose" in theme_key or "magenta" in theme_key:
        # Rich dramatic waves
        hair_elements = f"""
        <path d="M{w*0.25} {h*0.2} Q{w*0.18} {h*0.4} {w*0.32} {h*0.72}" fill="none" stroke="{accent}" stroke-width="24" stroke-opacity="0.8"/>
        <path d="M{w*0.35} {h*0.15} Q{w*0.28} {h*0.42} {w*0.42} {h*0.68}" fill="none" stroke="{accent2}" stroke-width="15" stroke-opacity="0.9"/>
        <path d="M{w*0.48} {h*0.25} Q{w*0.55} {h*0.48} {w*0.38} {h*0.8}" fill="none" stroke="{accent}" stroke-width="12" stroke-opacity="0.7"/>
        """
    elif "espresso" in theme_key or "burgundy" in theme_key or "dark" in theme_key:
        # Deep rich with highlights
        hair_elements = f"""
        <path d="M{w*0.28} {h*0.18} Q{w*0.22} {h*0.5} {w*0.38} {h*0.8}" fill="none" stroke="{accent}" stroke-width="26" stroke-opacity="0.75"/>
        <path d="M{w*0.4} {h*0.15} Q{w*0.35} {h*0.45} {w*0.5} {h*0.82}" fill="none" stroke="{accent2}" stroke-width="17" stroke-opacity="0.8"/>
        <path d="M{w*0.52} {h*0.22} Q{w*0.48} {h*0.48} {w*0.55} {h*0.7}" fill="none" stroke="#3a2a22" stroke-width="10" stroke-opacity="0.6"/>
        """
    elif "clinical" in theme_key or "scientific" in theme_key:
        # Clean geometric + lines
        hair_elements = f"""
        <rect x="{w*0.25}" y="{h*0.3}" width="{w*0.5}" height="{h*0.45}" rx="4" fill="none" stroke="{accent}" stroke-width="3" stroke-opacity="0.6"/>
        <line x1="{w*0.3}" y1="{h*0.35}" x2="{w*0.7}" y2="{h*0.35}" stroke="{accent2}" stroke-width="1.5" opacity="0.7"/>
        <line x1="{w*0.3}" y1="{h*0.45}" x2="{w*0.7}" y2="{h*0.45}" stroke="{accent2}" stroke-width="1.5" opacity="0.7"/>
        <circle cx="{w*0.5}" cy="{h*0.55}" r="{w*0.08}" fill="none" stroke="{accent}" stroke-width="4"/>
        """
    elif "studio" in theme_key or "shadow" in theme_key:
        # Architectural clean
        hair_elements = f"""
        <rect x="{w*0.15}" y="{h*0.25}" width="{w*0.7}" height="{h*0.55}" fill="none" stroke="{accent}" stroke-width="4"/>
        <path d="M{w*0.2} {h*0.3} L{w*0.8} {h*0.3} L{w*0.8} {h*0.75} L{w*0.2} {h*0.75} Z" fill="none" stroke="{accent2}" stroke-width="2"/>
        <line x1="{w*0.25}" y1="{h*0.35}" x2="{w*0.25}" y2="{h*0.7}" stroke="{accent}" stroke-width="8" opacity="0.5"/>
        """
    elif "product" in theme_key or "tools" in theme_key:
        # Object focused
        hair_elements = f"""
        <ellipse cx="{w*0.5}" cy="{h*0.48}" rx="{w*0.32}" ry="{h*0.18}" fill="none" stroke="{accent}" stroke-width="3"/>
        <rect x="{w*0.35}" y="{h*0.32}" width="{w*0.3}" height="{h*0.32}" rx="12" fill="none" stroke="{accent2}" stroke-width="4"/>
        <circle cx="{w*0.5}" cy="{h*0.55}" r="{w*0.06}" fill="{accent}" opacity="0.6"/>
        """
    else:
        # Default elegant hair flow
        hair_elements = f"""
        <path d="M{w*0.3} {h*0.2} Q{w*0.22} {h*0.48} {w*0.4} {h*0.78}" fill="none" stroke="{accent}" stroke-width="22" stroke-opacity="0.8"/>
        <path d="M{w*0.4} {h*0.15} Q{w*0.32} {h*0.5} {w*0.52} {h*0.75}" fill="none" stroke="{accent2}" stroke-width="16" stroke-opacity="0.85"/>
        <path d="M{w*0.5} {h*0.22} Q{w*0.55} {h*0.45} {w*0.45} {h*0.82}" fill="none" stroke="{accent}" stroke-width="10" stroke-opacity="0.65"/>
        """
    
    # Add subtle vignette and light highlights
    vignette = f"""
    <defs>
        <radialGradient id="vignette" cx="50%" cy="40%" r="75%" fx="48%" fy="35%">
            <stop offset="55%" stop-color="{bg}" stop-opacity="0"/>
            <stop offset="100%" stop-color="{bg}" stop-opacity="0.65"/>
        </radialGradient>
        <linearGradient id="light" x1="30%" y1="10%" x2="70%" y2="85%">
            <stop offset="0%" stop-color="{accent2}" stop-opacity="0.12"/>
            <stop offset="100%" stop-color="{accent}" stop-opacity="0.05"/>
        </linearGradient>
    </defs>
    <rect width="{w}" height="{h}" fill="{bg}"/>
    <rect width="{w}" height="{h}" fill="url(#vignette)"/>
    <rect width="{w}" height="{h}" fill="url(#light)" />
    """
    
    # Central abstract subject area
    subject = f"""
    <!-- Abstract subject representation -->
    <g>
        {hair_elements}
        <!-- Subtle face / shoulder silhouette for beauty portraits -->
        <ellipse cx="{w*0.5}" cy="{h*0.38}" rx="{w*0.12}" ry="{h*0.09}" fill="{accent}" opacity="0.08"/>
        <ellipse cx="{w*0.5}" cy="{h*0.55}" rx="{w*0.18}" ry="{h*0.22}" fill="none" stroke="{accent}" stroke-width="1.5" opacity="0.35"/>
    </g>
    """
    
    # Add scientific or detail specific overlays
    if prompt["section"] in ["philosophy", "detail"]:
        subject += f"""
        <circle cx="{w*0.5}" cy="{h*0.5}" r="{w*0.35}" fill="none" stroke="{accent2}" stroke-width="1" opacity="0.25"/>
        <line x1="{w*0.2}" y1="{h*0.48}" x2="{w*0.8}" y2="{h*0.48}" stroke="{accent}" stroke-width="1.5" opacity="0.3"/>
        """
    
    if "prism" in prompt["title"].lower() or "spectral" in prompt["title"].lower():
        # Rainbow band
        subject = f"""
        <defs>
          <linearGradient id="spectrum" x1="0%" y1="50%" x2="100%" y2="50%">
            <stop offset="0%" stop-color="#ff0000"/>
            <stop offset="14%" stop-color="#ff8800"/>
            <stop offset="28%" stop-color="#ffee00"/>
            <stop offset="42%" stop-color="#00ff00"/>
            <stop offset="56%" stop-color="#00aaff"/>
            <stop offset="70%" stop-color="#4400ff"/>
            <stop offset="100%" stop-color="#8800ff"/>
          </linearGradient>
        </defs>
        <rect x="{w*0.15}" y="{h*0.38}" width="{w*0.7}" height="{h*0.08}" fill="url(#spectrum)" opacity="0.95"/>
        <path d="M{w*0.3} {h*0.42} L{w*0.7} {h*0.42}" fill="none" stroke="#ffffff" stroke-width="1.5" opacity="0.4"/>
        """
    
    # Text content
    label = f"""
    <g>
        <!-- Top badge -->
        <rect x="{w*0.06}" y="{h*0.04}" width="{w*0.32}" height="{h*0.06}" rx="6" fill="{accent}" opacity="0.15"/>
        <text x="{w*0.08}" y="{h*0.08}" font-family="system-ui, -apple-system, sans-serif" font-size="{int(h*0.028)}" font-weight="600" fill="{text_col}" letter-spacing="1.5">PROMPT {prompt['id']:02d}</text>
        
        <!-- Title -->
        <text x="{w*0.5}" y="{h*0.88}" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-size="{int(h*0.038)}" font-weight="700" fill="{text_col}">{prompt['title']}</text>
        
        <!-- Subtitle -->
        <text x="{w*0.5}" y="{h*0.925}" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-size="{int(h*0.025)}" fill="{accent2}" opacity="0.95">{prompt['subtitle']}</text>
        
        <!-- Bottom meta -->
        <text x="{w*0.5}" y="{h*0.96}" text-anchor="middle" font-family="monospace" font-size="{int(h*0.018)}" fill="{text_col}" opacity="0.6">{prompt['res']} • {prompt['ratio']} • {prompt['section'].upper()}</text>
    </g>
    """
    
    # Final SVG
    svg = f"""<svg xmlns="http://www.w3.org/2000/svg" width="{w}" height="{h}" viewBox="0 0 {w} {h}">
{vignette}
{subject}
{label}
    <!-- Elegant minimal border -->
    <rect x="12" y="12" width="{w-24}" height="{h-24}" rx="3" fill="none" stroke="{accent}" stroke-width="1.5" opacity="0.15"/>
</svg>"""
    
    return svg

def main():
    os.makedirs(BASE_DIR, exist_ok=True)
    
    generated_count = 0
    skipped = 0
    
    for p in PROMPTS:
        section_dir = os.path.join(BASE_DIR, p["section"])
        os.makedirs(section_dir, exist_ok=True)
        
        filename = f"{p['id']:02d}.svg"
        filepath = os.path.join(section_dir, filename)
        
        # Skip if JPG already exists (we generated the first 10)
        jpg_path = os.path.join(section_dir, f"{p['id']:02d}.jpg")
        if os.path.exists(jpg_path):
            print(f"✓ Skipping {p['id']:02d} — real image exists")
            skipped += 1
            continue
        
        svg_content = create_svg(p)
        
        with open(filepath, "w", encoding="utf-8") as f:
            f.write(svg_content)
        
        print(f"✓ Created {p['id']:02d}.svg — {p['title']} ({p['section']})")
        generated_count += 1
    
    print(f"\nDone. {generated_count} SVG placeholders generated. {skipped} real JPGs skipped.")
    print(f"Placeholders saved to: {BASE_DIR}/")

if __name__ == "__main__":
    main()