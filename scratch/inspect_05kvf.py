import urllib.request
import re

url = "https://codeforinnovex.in/_next/static/immutable/chunks/05kvf6gjb5_nu.js"
data = urllib.request.urlopen(url).read().decode('utf-8', errors='ignore')

# print strings and comments
strings = re.findall(r'\"([a-zA-Z0-9_\-\s\.\,\:\;\?\!\/]{4,100})\"', data)
for s in strings[:40]:
    print(" ", s)
