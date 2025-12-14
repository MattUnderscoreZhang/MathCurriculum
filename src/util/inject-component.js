export async function injectComponent(elementId, componentFilePath, ...params) {
    const element = document.getElementById(elementId);
    if (!element) throw new Error(`No element with id '${elementId}' found`);

    const component = await fetch(`${componentFilePath}/main.html`);
    if (!component.ok) throw new Error(`Fetch failed: ${component.status} ${component.statusText}`);
    element.innerHTML = await component.text();

    const { initComponent } = await import(`${componentFilePath}/main.js`);
    initComponent(...params);
}
