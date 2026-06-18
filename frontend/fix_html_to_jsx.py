from pathlib import Path
import re

files = [
    Path('src/features/pelatih-dashboard/index.jsx'),
    Path('src/features/manajemen-jadwal/index.jsx'),
    Path('src/features/manajemen-kursus/index.jsx'),
    Path('src/features/pengaturan-pelatih/index.jsx'),
    Path('src/features/profile-atlet/index.jsx'),
    Path('src/features/daftar-atlet/index.jsx'),
]

for path in files:
    text = path.read_text(encoding='utf-8')

    # Remove full document wrappers
    text = re.sub(r'<!DOCTYPE html>\s*', '', text, flags=re.I)
    text = re.sub(r'<html[^>]*>', '', text, flags=re.I)
    text = re.sub(r'</html>', '', text, flags=re.I)
    text = re.sub(r'<head[^>]*>.*?</head>', '', text, flags=re.S | re.I)
    text = re.sub(r'<body([^>]*)>', lambda m: '<div' + m.group(1) + '>', text, flags=re.I)
    text = re.sub(r'</body>', '</div>', text, flags=re.I)

    # Remove script/style blocks
    text = re.sub(r'<script\b[^>]*>.*?</script>', '', text, flags=re.S | re.I)
    text = re.sub(r'<style\b[^>]*>.*?</style>', '', text, flags=re.S | re.I)

    # Convert HTML comments into JSX comments
    text = re.sub(r'<!--(.*?)-->', lambda m: '{/*' + m.group(1) + '*/}', text, flags=re.S)

    # Convert raw HTML event handlers to safe JSX placeholders
    text = re.sub(r'onClick="([^"]*)"', lambda m: 'onClick={() => ' + m.group(1) + '}', text)
    text = re.sub(r'onclick="([^"]*)"', lambda m: 'onClick={() => ' + m.group(1) + '}', text)
    text = re.sub(r'onChange="([^"]*)"', lambda m: 'onChange={() => ' + m.group(1) + '}', text)
    text = re.sub(r'onchange="([^"]*)"', lambda m: 'onChange={() => ' + m.group(1) + '}', text)
    text = re.sub(r'onInput="([^"]*)"', lambda m: 'onInput={() => ' + m.group(1) + '}', text)
    text = re.sub(r'oninput="([^"]*)"', lambda m: 'onInput={() => ' + m.group(1) + '}', text)

    # Convert common HTML attributes
    text = re.sub(r'\bclass=', 'className=', text)
    text = re.sub(r'\bfor=', 'htmlFor=', text)

    # Clean up stray whitespace
    text = text.strip()

    # Skip if already valid React component
    if not text.startswith('export default'):
        component_name = path.stem.replace('-', ' ').title().replace(' ', '')
        text = f'export default function {component_name}() {{\n  return (\n{text}\n  );\n}}\n'

    path.write_text(text, encoding='utf-8')
    print(f'Updated {path}')
