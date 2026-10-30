from playwright.sync_api import sync_playwright
import time
import json

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 1280, "height": 900})
    
    # Track network requests for 3D assets, glb, wasm, workers, shaders
    network_requests = []
    page.on("request", lambda req: network_requests.append({
        "url": req.url,
        "resource_type": req.resource_type
    }))
    
    print("Navigating to https://codeforinnovex.in/timeline ...")
    page.goto('https://codeforinnovex.in/timeline')
    page.wait_for_load_state('networkidle')
    time.sleep(2)
    
    # Check canvas elements
    canvases = page.locator('canvas').count()
    print(f"Canvas count on /timeline: {canvases}")
    
    # Inspect 3D observatory button
    obs_btn = page.locator('button:has-text("3D · Observatory"), button:has-text("3D")')
    print("3D button count:", obs_btn.count())
    if obs_btn.count() > 0:
        obs_btn.first.click()
        time.sleep(2)
        print("Clicked 3D Observatory button")
        canvases_after = page.locator('canvas').count()
        print(f"Canvas count after clicking 3D: {canvases_after}")
        
    page.screenshot(path=r'C:\Users\fizan\.gemini\antigravity\brain\b839e601-c4e5-4828-a091-43b0e82e4be9\scratch\innovex_timeline_3d.png')
    print("Saved innovex_timeline_3d.png")
    
    # Extract WebGL info from page
    webgl_info = page.evaluate("""() => {
        const canvases = Array.from(document.querySelectorAll('canvas'));
        return canvases.map(c => {
            const gl = c.getContext('webgl2') || c.getContext('webgl');
            if (!gl) return { type: '2d-canvas' };
            const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
            return {
                type: 'webgl',
                renderer: debugInfo ? gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) : 'unknown',
                vendor: debugInfo ? gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL) : 'unknown',
                width: c.width,
                height: c.height
            };
        });
    }""")
    print("WebGL Canvas info:", json.dumps(webgl_info, indent=2))
    
    # Check 3D / animation related network requests
    three_reqs = [r['url'] for r in network_requests if any(ext in r['url'].lower() for ext in ['.glb', '.gltf', '.wasm', 'three', 'orbit', 'camera', 'chunk'])]
    print(f"Dynamic chunks/assets loaded: {len(three_reqs)}")
    for tr in three_reqs[:15]:
        print("  ", tr)

    browser.close()
