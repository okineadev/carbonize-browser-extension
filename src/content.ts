chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "getSelection") {
        const selectedText = window.getSelection();

        if (selectedText) {
            sendResponse({ selectionText: selectedText.toString() });
        }
    }
});
