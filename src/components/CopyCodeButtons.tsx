"use client";

import { useEffect } from "react";

export default function CopyCodeButtons() {
    useEffect(() => {
        const codeBlocks = document.querySelectorAll('.prose pre');

        codeBlocks.forEach((pre) => {
            // Skip if already has a copy button
            if (pre.parentElement?.classList.contains('code-block-wrapper')) return;

            // Create wrapper
            const wrapper = document.createElement('div');
            wrapper.className = 'code-block-wrapper relative group my-4';

            // Get language from data attribute
            const lang = pre.getAttribute('data-language') || '';

            // Create language label
            if (lang) {
                const langLabel = document.createElement('div');
                langLabel.className = 'absolute top-2 right-12 text-[10px] uppercase opacity-60 px-2 py-0.5 rounded z-10';
                langLabel.style.color = 'var(--text-muted)';
                langLabel.textContent = lang;
                wrapper.appendChild(langLabel);
            }

            // Create copy button
            const copyBtn = document.createElement('button');
            copyBtn.className = 'absolute top-2 right-2 p-1.5 rounded opacity-0 group-hover:opacity-100 transition-opacity z-10 copy-btn';
            copyBtn.style.background = 'var(--background-secondary)';
            copyBtn.style.color = 'var(--text-muted)';
            copyBtn.setAttribute('aria-label', 'Copy code');
            copyBtn.innerHTML = `<svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>`;

            // Copy functionality
            copyBtn.onclick = async () => {
                const code = pre.textContent || '';
                try {
                    await navigator.clipboard.writeText(code);
                    copyBtn.innerHTML = `<svg class="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>`;
                    setTimeout(() => {
                        copyBtn.innerHTML = `<svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>`;
                    }, 2000);
                } catch (err) {
                    console.error('Failed to copy:', err);
                }
            };

            wrapper.appendChild(copyBtn);

            // Wrap the pre element
            pre.parentNode?.insertBefore(wrapper, pre);
            wrapper.appendChild(pre);
        });
    }, []);

    // This component doesn't render anything visible
    return null;
}
