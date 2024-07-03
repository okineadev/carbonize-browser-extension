// Create context menu item when extension is installed or reloaded
chrome.runtime.onInstalled.addListener(() => {
	chrome.contextMenus.create({
		id: "carbonizeCodeContextMenu",
		title: "Carbonize code",
		contexts: ["selection"], // Show context menu item only when text is selected
	});
});

// Add listener for clicks on the context menu item
chrome.contextMenus.onClicked.addListener((info, tab) => {
	if (info.menuItemId === "carbonizeCodeContextMenu" && info.selectionText) {
		chrome.tabs.sendMessage(tab.id, { action: "getSelection" }, (response) => {
			console.log(response);
			let selectedText: string;

			if (response?.selectionText) {
				selectedText = encodeURIComponent(response.selectionText);

				// Construct the URL to open Carbon with the selected text
				const carbonUrl = `https://carbon.now.sh/?code=${selectedText}`;

				// Open a new tab with the Carbon URL
				chrome.tabs.create({ url: carbonUrl });
			}
		});
	}
});
