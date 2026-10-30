import urllib.request
import re

headers = {'User-Agent': 'Mozilla/5.0'}
html = urllib.request.urlopen(urllib.request.Request('https://codeforinnovex.in/timeline', headers=headers)).read().decode('utf-8')
scripts = set(re.findall(r'src="(/_next/static/immutable/chunks/[^"]+\.js)"', html))

found = {}
for s in scripts:
    url = f"https://codeforinnovex.in{s}"
    content = urllib.request.urlopen(urllib.request.Request(url, headers=headers)).read().decode('utf-8', errors='ignore')
    # search for webgl, three, mesh, canvas, scene, animation
    for k in ['WebGLRenderer', 'PerspectiveCamera', 'Scene', 'Mesh', 'TorusGeometry', 'CylinderGeometry', 'gsap', 'framer']:
        if k in content:
            found.setdefault(s, []).append(k)

for s, terms in found.items():
    print(f"{s}: {terms}")
