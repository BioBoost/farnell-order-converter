module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    let original = req.body;

    let result = generateInstructionHeader()
                + retrieveOrderListing(original)
                + "\n\n"
                + generateCheckFooter(retrieveTotalCheck(original));

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: result
    };

    // if (req.query.name || (req.body && req.body.name)) {
    //     context.res = {
    //         // status: 200, /* Defaults to 200 */
    //         body: "Hello " + (req.query.name || req.body.name)
    //     };
    // }
    // else {
    //     context.res = {
    //         status: 400,
    //         body: "Please pass a name on the query string or in the request body"
    //     };
    // }
};

function retrieveOrderListing(order) {
  let regEx = /^\d+.*$/gim;
  let match = order.match(regEx);
  return match.join('\n');
}

function retrieveTotalCheck(order) {
  let regEx = /,,,,,,,.*/gim;
  let match = order.match(regEx);
  return match.join('\n');
}

function generateInstructionHeader() {
  let header = "Onderstaande lijst kan worden geplakt op de website van Farnell.\n";
  header += "Ga naar https://be.farnell.com\n";
  header += "Kies vervolgens \"Hulpmiddelen => Snel kopen\" in het menu.\n";
  header += "Open het tabblad \"Snel plakken\" en plak er onderstaande lijst in (zonder de dashes ----)\n";
  header += "-------------------------------------------\n\n";

  return header;
}

function generateCheckFooter(originalTotalCheck) {
  let footer = "-------------------------------------------\n\n\n";
  footer += "Dit is ter controle:\n"
  footer += "-------------------------------------------\n";
  footer += originalTotalCheck;
  return footer;
}