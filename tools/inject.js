// inject the contents of an HTML file into a div
export async function inject(id, filePath) {
    const element = document.getElementById(id);
    if (!element) throw new Error(`No element with id "${id}" found`);
    const content = await fetch(filePath);
    if (!content.ok) throw new Error(`Fetch failed: ${content.status} ${content.statusText}`);
    element.innerHTML = await content.text();
}
