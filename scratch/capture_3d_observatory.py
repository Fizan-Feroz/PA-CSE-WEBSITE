from playwright.sync_api import sync_playwright
import time

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 1280, "height": 900})
    page.goto('http://127.0.0.1:5173/')
    page.wait_for_load_state('networkidle')
    time.sleep(1.5)
    
    # 1. Capture Hero with Mechanical Eye & Orbiting Spark
    page.screenshot(path=r'C:\Users\fizan\.gemini\antigravity\brain\b839e601-c4e5-4828-a091-43b0e82e4be9\scratch\pacse_hero_orbits.png')
    print("Saved pacse_hero_orbits.png")
    
    # 2. Scroll to 3D Observatory and capture
    page.locator("#timeline-observatory").scroll_into_view_if_needed()
    time.sleep(1.5)
    page.screenshot(path=r'C:\Users\fizan\.gemini\antigravity\brain\b839e601-c4e5-4828-a091-43b0e82e4be9\scratch\pacse_3d_observatory.png')
    print("Saved pacse_3d_observatory.png")
    
    browser.close()
