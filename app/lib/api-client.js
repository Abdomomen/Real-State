/**
 * A simple client-side API helper to handle fetch requests with ease.
 * credentials: "include" is set globally so the HTTP-only token cookie
 * is always sent with every request automatically.
 */

const handleResponse = async (response) => {
    const data = await response.json();
    if (!response.ok) {
        return { error: true, message: data.message || "An error occurred", ...data };
    }
    return data;
};

export const apiClient = {
    get: async (url, options = {}) => {
        try {
            const response = await fetch(url, {
                method: "GET",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                    ...options.headers,
                },
                ...options,
            });
            return await handleResponse(response);
        } catch (error) {
            return { error: true, message: error.message };
        }
    },

    post: async (url, body, options = {}) => {
        try {
            const response = await fetch(url, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                    ...options.headers,
                },
                body: JSON.stringify(body),
                ...options,
            });
            return await handleResponse(response);
        } catch (error) {
            return { error: true, message: error.message };
        }
    },

    put: async (url, body, options = {}) => {
        try {
            const response = await fetch(url, {
                method: "PUT",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                    ...options.headers,
                },
                body: JSON.stringify(body),
                ...options,
            });
            return await handleResponse(response);
        } catch (error) {
            return { error: true, message: error.message };
        }
    },

    delete: async (url, options = {}) => {
        try {
            const response = await fetch(url, {
                method: "DELETE",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                    ...options.headers,
                },
                ...options,
            });
            return await handleResponse(response);
        } catch (error) {
            return { error: true, message: error.message };
        }
    },
};
