/**
 * A simple client-side API helper to handle fetch requests with ease.
 * credentials: "include" is set globally so the HTTP-only token cookie
 * is always sent with every request automatically.
 */
// middleware to refresh token if required
let isRefreshing=false
const refreshToken= async()=>{
    if(isRefreshing) return 
    isRefreshing=true
    try {
        let refresh= await apiClient.post("api/auth/refresh")
        if(refresh.success) return refresh

    } catch (err) {
        return refresh
    }finally{
        isRefreshing=false
    }
}

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
            let res=await handleResponse(response);
            if(res.error && res.message=="invalid token") {
                let refresh= await refreshToken()
                if(refresh.success) return apiClient.get(url,options)
            }
            return res
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
            let res=await handleResponse(response);
            if(res.error && res.message=="invalid token") {
                let refresh= await refreshToken()
                if(refresh.success) return apiClient.post(url,body,options)
            }
            return res
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
            let res=await handleResponse(response);
            if(res.error && res.message=="invalid token") {
                let refresh= await refreshToken()
                if(refresh.success) return apiClient.put(url,body,options)
            }
            return res
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
            let res=await handleResponse(response);
            if(res.error && res.message=="invalid token") {
                let refresh= await refreshToken()
                if(refresh.success) return apiClient.delete(url,options)
            }
            return res
        } catch (error) {
            return { error: true, message: error.message };
        }
    },
};
