console.log("js works!");

function makeGetCall() {
    axios({
        method: 'GET',
        url: '/thing',
    }).then(
        function (response) {
            console.log('GET /thing call successful');
            console.log('response:', response);
        }
    ).catch(
        function (error) {
            console.log('GET /thing call failed');
            console.log('error:', error);
        }
    );
}

function makePostCall() {
    let newThing = {
        thingDescription: `thing ${Math.floor(Math.random() * 100)}`,
    };

    axios({
        method: 'POST',
        url: '/thing',
        data: newThing
    }).then(
        function (response) {
            console.log('POST /thing call successful');
            console.log('response:', response);
        }
    ).catch(
        function (error) {
            console.log('POST /thing call failed');
            console.log('error:', error);
        }
    )
}
