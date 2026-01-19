import { codeToHtml } from "shiki";

export async function highlightCode(code: string, lang: string = "text"): Promise<string> {
    // Normalize language name
    const normalizedLang = normalizeLanguage(lang);

    try {
        const html = await codeToHtml(code, {
            lang: normalizedLang,
            theme: "github-light",
        });
        return html;
    } catch (error) {
        // Fallback for unsupported languages
        console.warn(`Shiki: Language "${lang}" not supported, using plaintext`);
        try {
            const html = await codeToHtml(code, {
                lang: "plaintext",
                theme: "github-light",
            });
            return html;
        } catch {
            // Final fallback - return escaped HTML
            return `<pre class="shiki"><code>${escapeHtml(code)}</code></pre>`;
        }
    }
}

function normalizeLanguage(lang: string): string {
    const langMap: Record<string, string> = {
        'js': 'javascript',
        'ts': 'typescript',
        'py': 'python',
        'rb': 'ruby',
        'sh': 'bash',
        'shell': 'bash',
        'yml': 'yaml',
        'md': 'markdown',
        'text': 'plaintext',
        '': 'plaintext',
    };
    return langMap[lang.toLowerCase()] || lang.toLowerCase();
}

function escapeHtml(text: string): string {
    return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}
