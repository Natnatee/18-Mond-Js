let uploads = [];
let likedUploads = [];
let idCounter = 0;

document.getElementById("form").addEventListener("submit", function (event) {
	event.preventDefault();

	const imageURL = document.getElementById("imageURL").value;
	const imageCaption = document.getElementById("imageCaption").value;
	const imageCaption2 = document.getElementById("imageCaption2").value;
	const errorMessage = document.getElementById("errorMessage");

	// validation
	let errorMessageText = "";

	if (!isImgUrl(imageURL)) {
		errorMessageText += "Please enter a valid image URL. ";
	}
	if (imageCaption.length < 3 || imageCaption.length > 255) {
		errorMessageText += "Please describe your image (at least 3 characters, and not over 255 characters).";
	}
	if (imageCaption2 < 1) {
		errorMessageText += "Please enter a valid Number.";
	}
	
	if (errorMessageText) {
		errorMessage.textContent = errorMessageText;
		return;
	}

	// create new upload object
	const newUpload = {
		id: idCounter++,
		imageURL: imageURL,
		caption: imageCaption,
		caption2: imageCaption2,
		likes: false,
	};

	uploads.push(newUpload);

	displayUpload(newUpload);

	errorMessage.textContent = "";

	document.getElementById("form").reset();
});

function displayUpload(upload) {
	const displaySection = document.getElementById("displaySection");
	// create card
	const card = document.createElement("div");
	card.className = "flex h-28 m-2 bg-white rounded-lg";

	card.innerHTML = 
	`<input type="checkbox" class="" data-id="${upload.id}" onchange="toggleLike(event)">&nbsp;
		<img src="${upload.imageURL}" alt="${upload.caption}" class="w-fit rounded-md object-cover">
    	<label class="flex flex-col justify-between pl-2">
			<span class="my-1 text-gray-700 font-semibold  text-balance overflow-hidden ">${upload.caption}</span>
    		<span class="my-1 text-gray-700 font-semibold">${upload.caption2}</span>
			<button class="my-1 px-2 bg-yellow-500 text-white rounded-md">Edit</button>
    	</label>
 	`;

	displaySection.appendChild(card);
}

document.getElementById("AddToCart").addEventListener("click", function() {
    const displaySection2 = document.getElementById("displaySection2");
    displaySection2.innerHTML = ""; // Clear existing content

    likedUploads = uploads.filter(function(upload) {
        return upload.likes;
    });

	displayLikedUploads();
});

function displayLikedUploads() {
	const displaySection2 = document.getElementById("displaySection2");
	displaySection2.innerHTML = ""; // Clear existing content

	likedUploads.forEach(function(upload) {
		const card = document.createElement("div");
		card.className = "flex h-28 m-2 bg-white rounded-lg";

		card.innerHTML = 
		`<img src="${upload.imageURL}" alt="${upload.caption}" class="w-fit rounded-md object-cover">
			<label class="flex flex-col justify-between pl-2">
				<span class="my-1 text-gray-700 font-semibold text-balance overflow-hidden ">${upload.caption}</span>
				<span class="my-1 text-gray-700 font-semibold">${upload.caption2}</span>
				<button class="my-1 px-2 bg-red-500 text-white rounded-md" onclick="removeUpload(${upload.id})">Remove</button>
			</label>
		`;

		displaySection2.appendChild(card);
	});
}
  	//data-id ยัดid ให้มันในรูปแบบตัวแปรเผื่อเรียกใช้ onchange เมื่อมีการเปลี่ยนแปลง(คลิ๊ก)มันจะวิ่งไปฟังชั่นนี้
	// <label>นิยมใช้กับ<input> ส่วน <span> นิยมใช้แบบต่อกันทั่วไป คล้าย <a> แต่ <a> นิยมใช้เมื่อมี href
	// create card
	// นิมยมใช้ ` แทน ' เมื่อมีตัวแปรในข้อความ คีย์ลัดคือ alt+352
	//overflow-hidden ใช้ตัดเนื้อหาที่ไม่จำเป็นออก
	//&nbsp คือการเคาะ
function removeUpload(removeId) {
	likedUploads = likedUploads.filter(upload => upload.id !== removeId);
	displayLikedUploads();
}

function toggleLike(event) {
	const checkbox = event.target;
	const uploadId = parseInt(checkbox.getAttribute("data-id"));
	const upload = uploads.find((upload) => upload.id === uploadId);

	if (upload) {
		upload.likes = checkbox.checked;
	}
}

function calculate() {
	let totalPrice = 0;
	likedUploads.forEach(upload => {
		totalPrice += parseFloat(upload.caption2);
	});
	document.querySelector("#displaySection3").textContent = `You have to pay: ${totalPrice.toFixed(1)}`;
}

// Validating image URLs using RegEx
function isImgUrl(imageURL) {
	const input = new URL(imageURL);
	return /\.(jpg|png|gif)$/.test(input.pathname);
}

function testMaster(test){
	document.querySelector("#testMaster").textContent = test;
}
testMaster();