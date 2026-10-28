export function isLoggedIn() {
    return sessionStorage.getItem('auraDemoLoggedIn') === 'true' || Boolean(localStorage.getItem('auraUser'));
}

export function requireLogin() {
    if (isLoggedIn()) {
        return true;
    }

    const currentPage = window.location.pathname;
    const next = encodeURIComponent(currentPage);

    window.location.replace(`/pages/login.html?next=${next}`);
    return false;
}

export function logout() {
    sessionStorage.removeItem('auraDemoLoggedIn');
    sessionStorage.removeItem('auraDemoEmail');
    sessionStorage.removeItem('auraDemoName');
    localStorage.removeItem('auraUser');
    localStorage.removeItem('auraToken');

    window.location.replace('/');
}
