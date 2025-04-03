import GLOBAL from '../GlobalVariable';

export const fetchDateHeader = async (targetUrl) => {
    try {
        const response = await fetch(`${GLOBAL.API_URL}/api/proxy-date`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ url: targetUrl })
        });

        if (!response.ok) {
            // 4xx or 5xx
            const errMsg = await response.text();
            throw new Error(errMsg);
        }

        const data = await response.json();
        return data.dateHeader || '';
    } catch (error) {
        return `Error: ${error.message}`;
    }
};
