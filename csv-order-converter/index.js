module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    if (req.body) {
      let original = req.body;

      let result = generateInstructionHeader()
                  + transformOrderListing(retrieveOrderListing(original))
                  + "\n\n"
                  + generateCheckFooter(retrieveTotalCheck(original));
  
      context.res = {
          // status: 200, /* Defaults to 200 */
          body: result
      };
    }
    else {
        context.res = {
            status: 400,
            body: "Please supply the Farnell CSV order in the body of the POST request."
        };
    }
};

function retrieveOrderListing(order) {
  let regEx = /^\d+.*$/gim;
  let match = order.match(regEx);
  if (match) {
    return match.join('\n');
  }
  return "";
}

function retrieveTotalCheck(order) {
  let regEx = /,,,,,,,.*/gim;
  let match = order.match(regEx);
  if (match) {
    return match.join('\n');
  }
  return "";
}

function transformOrderListing(originalOrderListing) {
  if (originalOrderListing) {
    let regEx = /^\d+,(.*?),.*?,,(\d+)\.0,.*$/gim;
    return originalOrderListing.replace(regEx, '$1, $2');
  }
  return "";
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