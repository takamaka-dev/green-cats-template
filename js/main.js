refreshContent = () => {
  $.ajax({
    headers: {
      'Content-Type': "application/json"
    },
    type: 'GET',
    url: window.webappname + '/resources/javaee8/campaign_view/getapprovedmsg/' + $('#walletAddress').html() + '/10',
    contentType: "application/json",
    success: function (dataRes) {
      let approvedList = JSON.parse(dataRes['postReturn']);
      $('.approved-list').html('');
      if (approvedList.length > 0) {
        $.each(approvedList, function (transactionHash, trx) {
          let data_trx = JSON.parse(trx);
          $('.approved-list').append($('.managed-message-template').html()
            .replace("{TRX_HASH}", data_trx['transactionHash'])
            .replace("{TRX_AMOUNT}", parseInt(data_trx['redValue']) / Math.pow(10, 9))
            .replace("{TRX_MSG}", data_trx['message'] === null ? 'N/A' : data_trx['message'])
          );
        });
      } else {
        $('.approved-list').append($('.empty-message-template').html().replace('{MESSAGE}', 'Lista vuota'));
      }

    }
  });

}

getAddressBalance = (walletAddress) => {
  let dataForBalance = {};
  dataForBalance['data'] = walletAddress;
  dataForBalance['endpoint'] = 'https://dev.takamaka.io/api/V2/testapi/balanceof/'


  $.ajax({
    headers: {
      'Content-Type': "application/json"
    },
    type: 'POST',
    url: window.webappname + '/resources/javaee8/getWalletBalances',
    contentType: "application/json",
    dataType: "json",
    data: JSON.stringify(dataForBalance),
    success: function (dataRes) {
      dataRes['redBalance'] /= Math.pow(10, 9);

      console.log(Number(dataRes['redBalance']).toLocaleString("de-DE"));

      $('#balance').find('span').html(Number(dataRes['redBalance']).toLocaleString("de-DE"))
    }
  });
}


$(document).ready(function () {
  document.querySelectorAll('pre code').forEach((block) => {
    hljs.highlightBlock(block);
  });
  var settings = {
    "url": "http://localhost:8080/walletwebversion/resources/javaee8/campaign_view/getqr/sX2bMNg-xPu5aI6A19KtaWjsj0GDjDPMmvFGuhzb4tI./400/Dona!!",
    "method": "GET",
    "timeout": 0,
  };

  setInterval(function () {
    let time = $('#time').attr('data-time') - 1;
    if (parseInt(time) === 0) {
      $('#time').attr('data-time', 10);
    } else {
      $('#time').attr('data-time', time);
    }
    $('#time').html('Si aggiorna in: ' + time);

  }, 1000);

  $.ajax(settings).done(function (response) {
    $('#qr').attr('src', 'data:image/jpeg;base64,' + response)
  });

  $('#qr').on('click', function () {
    $('#exampleModal').find('code').html('var settings = {\n' +
      '  "url": "http://localhost:8080/walletwebversion/resources/javaee8/campaign_view/getqr/sX2bMNg-xPu5aI6A19KtaWjsj0GDjDPMmvFGuhzb4tI./400/Dona!!",\n' +
      '  "method": "GET",\n' +
      '  "timeout": 0,\n' +
      '};\n' +
      '\n' +
      '$.ajax(settings).done(function (response) {\n' +
      '  console.log(response);\n' +
      '});')
    $('#exampleModal').modal();
  })

  $('#question-icon').on('click', function () {
    $('#exampleModal').find('code').html('refreshContent = () => {\n' +
      '  $.ajax({\n' +
      '    headers: {\n' +
      '      \'Content-Type\': "application/json"\n' +
      '    },\n' +
      '    type: \'GET\',\n' +
      '    url: window.webappname + \'/resources/javaee8/campaign_view/getapprovedmsg/\' + $(\'#walletAddress\').html() + \'/10\',\n' +
      '    contentType: "application/json",\n' +
      '    success: function (dataRes) {\n' +
      '      let approvedList = JSON.parse(dataRes[\'postReturn\']);\n' +
      '      $(\'.approved-list\').html(\'\');\n' +
      '      if (approvedList.length > 0) {\n' +
      '        $.each(approvedList, function (transactionHash, trx) {\n' +
      '          let data_trx = JSON.parse(trx);\n' +
      '          $(\'.approved-list\').append($(\'.managed-message-template\').html()\n' +
      '            .replace("{TRX_HASH}", data_trx[\'transactionHash\'])\n' +
      '            .replace("{TRX_AMOUNT}", parseInt(data_trx[\'redValue\']) / Math.pow(10, 9))\n' +
      '            .replace("{TRX_MSG}", data_trx[\'message\'] === null ? \'N/A\' : data_trx[\'message\'])\n' +
      '          );\n' +
      '        });\n' +
      '      } else {\n' +
      '        $(\'.approved-list\').append($(\'.empty-message-template\').html().replace(\'{MESSAGE}\', \'Lista vuota\'));\n' +
      '      }\n' +
      '\n' +
      '    }\n' +
      '  });\n' +
      '\n' +
      '}')
    $('#exampleModal').modal();
  });

  $('#balance-question').on('click', function() {
    $('#exampleModal').find('code').html('getAddressBalance = (walletAddress) => {\n' +
      '  let dataForBalance = {};\n' +
      '  dataForBalance[\'data\'] = walletAddress;\n' +
      '  dataForBalance[\'endpoint\'] = \'https://dev.takamaka.io/api/V2/testapi/balanceof/\'\n' +
      '\n' +
      '\n' +
      '  $.ajax({\n' +
      '    headers: {\n' +
      '      \'Content-Type\': "application/json"\n' +
      '    },\n' +
      '    type: \'POST\',\n' +
      '    url: window.webappname + \'/resources/javaee8/getWalletBalances\',\n' +
      '    contentType: "application/json",\n' +
      '    dataType: "json",\n' +
      '    data: JSON.stringify(dataForBalance),\n' +
      '    success: function (dataRes) {\n' +
      '      dataRes[\'redBalance\'] /= Math.pow(10, 9);\n' +
      '\n' +
      '      console.log(Number(dataRes[\'redBalance\']).toLocaleString("de-DE"));\n' +
      '\n' +
      '      $(\'#balance\').find(\'span\').html(Number(dataRes[\'redBalance\']).toLocaleString("de-DE"))\n' +
      '    }\n' +
      '  });\n' +
      '}')
    $('#exampleModal').modal();
  });

  window.webappname = 'http://localhost:8080/walletwebversion';

  refreshContent();
  getAddressBalance($('#walletAddress').html());

  /*setInterval(function () {
    refreshContent();
    getAddressBalance($('#walletAddress').html());

  }, 10000);*/
})
