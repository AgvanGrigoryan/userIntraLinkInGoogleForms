async function fetchImageUrl(url) {
    try {
        // Send a request to the specified URL
        const response = await fetch(url);
        
        // Check if the response is ok (status code in the range 200-299)
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        // Get the text content of the response
        const html = await response.text();
        
        // Create a DOM parser to parse the HTML string
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        
        // Find the element with the specified class
        const imageElement = doc.querySelector('.bg-image-item.profile-image');
        
        if (imageElement) {
            // Get the style attribute and extract the URL
            const style = imageElement.style.backgroundImage;
            const imageUrl = style.match(/url\(["']?([^"']+)["']?\)/)[1];
            console.log('Image URL:', imageUrl);
            return imageUrl;
        } else {
            console.error('Element not found');
        }
    } catch (error) {
        console.error('Error fetching the image URL:', error);
    }
}

window.onload = function () {
	let intra_link = "https://profile.intra.42.fr/users/";
	/* <a href="intra_link + login" style="background-color:black;width: 32px;height: 32px;"></a> */

	let listItems = document.querySelectorAll('[role="listitem"]');
	if (!listItems)
		return;
	listItems.forEach((listItems) => {
		const labelElement = listItems.querySelector('label > div > div > div > span');
		if (labelElement) {
			const link = document.createElement('a');
			
			const name = labelElement.innerText;
			const user_intra_link = intra_link + name;
			link.href = user_intra_link;

			link.style.backgroundColor = 'black';
			link.style.width = '32px';
			link.style.height = '32px';
			link.style.display = 'inline-block'; // Чтобы размер ссылки сработал (для блочных элементов)

			fetch(chrome.runtime.getURL('ft.svg'))
				.then(response => response.text())
				.then(svgContent => {
					link.innerHTML = svgContent;

					listItems.appendChild(link);
				})
				.catch(error => console.error("Error with svg loading", error));
			console.log(name); // Вывод имени из атрибута aria-label
		}
	});
};