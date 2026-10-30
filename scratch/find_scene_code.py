import urllib.request
import re

chunks = [
   "05kvf6gjb5_nu.js", "1cd7hiqid62o8.js", "44wj2gxxds98a.js",
   "2x_jsyfuvh1lz.js", "2_x2v5_7tx_o2.js", "285gcu30ze2j7.js", "0-6kl1i6o0vv_.js",
   "2drou12t_s1ql.js", "3sajpxfqx5_01.js", "1idagnp9aay6i.js", "0g2r06-7r8q6w.js",
   "01pa2ev2s56lo.js", "2n4nhv66vu2ds.js", "3feux1r7quz9p.js", "1n7renga4tuqn.js"
]

for c in chunks:
    url = f"https://codeforinnovex.in/_next/static/immutable/chunks/{c}"
    try:
        data = urllib.request.urlopen(url).read().decode('utf-8', errors='ignore')
        # check for timeline, observatory, astrolabe, clock, rings, brass, gold, rotation
        matches = [m for m in ['observatory', 'astrolabe', 'clock', 'phase', 'ring', 'disc', 'orbit', 'sun', 'moon', 'pillar'] if m in data.lower()]
        if len(matches) >= 3:
            print(f"Candidate chunk: {c} (size: {len(data)}) matches: {matches}")
    except Exception as e:
        pass
