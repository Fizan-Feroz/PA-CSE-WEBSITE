import urllib.request
import re

url = 'https://codeforinnovex.in/_next/static/immutable/chunks/1n7renga4tuqn.js'
headers = {'User-Agent': 'Mozilla/5.0'}
data = urllib.request.urlopen(urllib.request.Request(url, headers=headers)).read().decode('utf-8', errors='ignore')

print("Length of 1n7renga4tuqn.js:", len(data))
# Check Three.js imports or functions
matches = re.findall(r'(\b[a-zA-Z0-9_$]+\s*=\s*new\s+[a-zA-Z0-9_$.]+\([^)]*\))', data)
print("New instantiations (first 20):")
for m in matches[:25]:
    print(" ", m)

# Search for geometry, material, mesh, scene, camera, lights, orbit, animation
for term in ['Scene', 'PerspectiveCamera', 'WebGLRenderer', 'MeshStandardMaterial', 'MeshBasicMaterial', 'RingGeometry', 'SphereGeometry', 'CylinderGeometry', 'TorusGeometry', 'OrbitControls', 'requestAnimationFrame']:
    pos = data.find(term)
    if pos != -1:
        start = max(0, pos - 50)
        end = min(len(data), pos + 100)
        print(f"\nTerm '{term}': ...{data[start:end]}...")
