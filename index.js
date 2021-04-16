const ddcci = require('@hensm/ddcci');
const usb = require('usb-detection');

usb.startMonitoring();

const DisplayInputs = {
    VGA1: 1,
    VGA2: 2,
    DVI1: 3,
    DVI2: 4,
    COMPV1: 5,
    COMPV2: 6,
    SVID1: 7,
    SVID2: 8,
    TUNER1: 9,
    TUNER2: 10,
    TUNER3: 11,
    COMPOV1: 12,
    COMPOV2: 13,
    COMPOV3: 14,
    DP1: 15,
    DP2: 16,
    HDMI1: 17,
    HDMI2: 18
}

var monitors = []; 
let vendorId = 6940;

usb.on(`add:${vendorId}`, async (device) => {
    await refreshMonitors();

    try {
        if (device.serialNumber === '1702B028AF4C18865CC1EF8DF5001BC3' || device.serialNumber === '1200401FAF3C80475BC9DF96F5001BC6') {
            console.log(device);
            await ddcci.setInput(monitors[0], 15);
            await ddcci.setInput(monitors[1], 17);
        }
    } catch (e) {
        console.log(e);
    }
})

usb.on(`remove:${vendorId}`, async (device) => {
    await refreshMonitors();

    try {
        if (device.serialNumber === '1702B028AF4C18865CC1EF8DF5001BC3' || device.serialNumber === '1200401FAF3C80475BC9DF96F5001BC6') {
            console.log(device);
            //await ddcci.setInput(monitors[0], 15); //work: 17, laptop: 15
            //await ddcci.setInput(monitors[1], 17); // work: 18, laptop: 17
            await ddcci.setInput(monitors[0], 17); //work: 17, laptop: 15
            await ddcci.setInput(monitors[1], 18); // work: 18, laptop: 17
        }
    } catch (e) {
        console.log(e);
    }
})

async function refreshMonitors() {
    // Refresh the monitor handles. This should fix the async destroyed issue
    await ddcci._refresh();

    // populate our monitors list
    if (monitors.length == 0 || monitors == null) monitors = await ddcci.getMonitorList();
}

