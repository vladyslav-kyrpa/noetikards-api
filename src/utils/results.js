export const ok = (data) => ({
    success: true, data
});

export const fail = (error) => ({
    success: false, error
});

export default { ok, fail };