
const bufferConnector = require('./connectors/ipfs_buffer.js')
var Jimp = require('jimp');
var renderer = require("./layered_static/v1test.js")
const testI = require("./testI.json")
async function stampBlockNumber() { 
    //0x6c424C25e9F1ffF9642cB5B7750b0Db7312c29ad
    let tokenId = 0;
    renderer.setBufferConnector(bufferConnector);
    var layout = testI.layout;
    var blockNum = -1;
    console.log('======start=======');
    var image = await renderer.render(layout, blockNum, tokenId);

	var stampWidth = 350;
	var stampHeight = 50;

	var stampX = image.bitmap.width - stampWidth;
	var stampY = image.bitmap.height - stampHeight;

	await image.scan(stampX, stampY, stampWidth, stampHeight, function (x, y, offset) {
		var color = Jimp.rgbaToInt(255, 255, 255, 255);

		image.setPixelColor(color, x, y)
	});

	// load a font
	var font = await Jimp.loadFont(Jimp.FONT_SANS_32_BLACK);

	// print the block number
    image.print(font, stampX + 25, stampY + 9, "Block #" + blockNum);
    
    if (image === null) {
		console.log(error);
	} else {
		// determine the render path
		var path = "renders/token-" + tokenId + "_block-" + blockNum + "22222.jpg";
		// output to console
		console.log("Writing to " + path + "...");
		// write the final artwork
		image.write(path);
		// output to console
		console.log("Wrote to " + path + ".");
	}
}

stampBlockNumber();

