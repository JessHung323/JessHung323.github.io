const tabs = [...document.querySelectorAll('.tabs a')];
const panels = [...document.querySelectorAll('.panel')];
const tablist = document.querySelector('.tabs');
tablist.setAttribute('role', 'tablist');
for (const tab of tabs) {
  tab.setAttribute('role', 'tab');
  tab.setAttribute('aria-controls', tab.hash.slice(1));
}
for (const panel of panels) {
  panel.setAttribute('role', 'tabpanel');
  panel.tabIndex = 0;
}
function selectTab(hash) {
  const selected = tabs.find(tab => tab.hash === hash) || tabs[0];
  for (const tab of tabs) {
    const active = tab === selected;
    tab.setAttribute('aria-selected', String(active));
    tab.tabIndex = active ? 0 : -1;
  }
  for (const panel of panels) panel.hidden = panel.id !== selected.hash.slice(1);
}
for (const [index, tab] of tabs.entries()) {
  tab.addEventListener('click', event => {
    event.preventDefault();
    history.replaceState(null, '', tab.hash);
    selectTab(tab.hash);
  });
  tab.addEventListener('keydown', event => {
    let next;
    if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
    else if (event.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = tabs.length - 1;
    else return;
    event.preventDefault();
    tabs[next].click();
    tabs[next].focus();
  });
}
window.addEventListener('hashchange', () => selectTab(location.hash));
selectTab(location.hash);

const jasper = document.querySelector('.jasper-companion');
const motionToggle = document.querySelector('.jasper-toggle');
motionToggle.addEventListener('click', () => {
  const paused = jasper.classList.toggle('is-paused');
  motionToggle.setAttribute('aria-pressed', String(paused));
  motionToggle.textContent = paused ? 'Resume animation' : 'Pause animation';
});
