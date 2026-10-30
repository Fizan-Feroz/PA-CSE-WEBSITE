from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page()
    
    js_loaded = []
    page.on("response", lambda res: js_loaded.append(res.url) if res.url.endswith('.js') else None)
    
    page.goto('https://codeforinnovex.in/timeline')
    page.wait_for_load_state('networkidle')
    
    print(f"Total JS loaded on /timeline: {len(js_loaded)}")
    for j in js_loaded:
        print("  ", j)
        
    # Check window objects
    win_objs = page.evaluate("""() => {
        const keys = Object.keys(window).filter(k => 
            k.toLowerCase().includes('three') || 
            k.toLowerCase().includes('timeline') || 
            k.toLowerCase().includes('canvas') ||
            k.toLowerCase().includes('observatory')
        );
        return keys;
    }""")
    print("Window keys matching:", win_objs)
    
    browser.close()
