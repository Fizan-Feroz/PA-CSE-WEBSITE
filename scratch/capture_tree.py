from playwright.sync_api import sync_playwright
import time

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 1280, "height": 900})
    page.goto('http://127.0.0.1:5173/')
    page.wait_for_load_state('networkidle')
    time.sleep(1)
    
    # Scroll to domains section
    page.locator("#domains-section").scroll_into_view_if_needed()
    time.sleep(0.5)
    page.screenshot(path=r'C:\Users\fizan\.gemini\antigravity\brain\b839e601-c4e5-4828-a091-43b0e82e4be9\scratch\pacse_visual_tree.png')
    print("Saved pacse_visual_tree.png")
    
    browser.close()
