
//anropar en funktion som hämtar jsondatat
loadJsonData("http://nhl-statistics.com/school/data.json");

//main-funktionen anropas efter hämtning av datan
function main(data)
{

  console.log("Kör main...");

  // pris vs reviews
  var xprice = getDataByKey(data, "price");
  var yreviews = getDataByKey(data, "reviews");
  plot(xprice, yreviews, "pricerev", "scatter", "markers", "Price and Reviews",
      "Price", "Reviews")

  // pris och enheter histogram
  var xyArrayPricesCount = count(data, "price");
  var xP = getX(xyArrayPricesCount);
  var yP = getY(xyArrayPricesCount);
  plot(xP, yP, "histogram", "bar", "", "Price Histogram", "Price", "Units");

  // accomodates och enheter histogram
  var xyArrayAccommodatesCount = count(data, "accommodates");
  console.table(xyArrayAccommodatesCount);
  var xA = getX(xyArrayAccommodatesCount);
  var yA = getY(xyArrayAccommodatesCount);
  plot(xA, yA, "histogram2", "bar", "", "Accommodates Histogram", "Accommodates", "Units");

  
  // priser per min_stay BOXPLOT deprecated övningsuppgift :(
  // Hittar maxvärdet av min_stay
  var search = getDataByKey(data, "minstay");
  var maxminstay = search.reduce(function(a, b)
  {
    return Math.max(a, b);
  });
  console.log("Max minstay var " + maxminstay);
  traces = [];
  for ( var i = 0; i < maxminstay; i++)
  {
    var priserdag = getDataByKeyAndValue(data, "price", "minstay", i);

    traces.push({
      y : priserdag,
      type : 'box',
      name : i + ' dag'
    })

  }

  plotWithTraces(traces, "boxplot", "Boxplotdiagram av pris/minstay",
      "Min stay", "Price")

  // piediagrammet

  var xyArrayRoomCount = count(data, "room_type");
  var labels = Object.getOwnPropertyNames(xyArrayRoomCount)
  var values = Object.values(xyArrayRoomCount);
  var index = labels.indexOf("length");
  labels.splice(index, 1);
  console.log(Object.getOwnPropertyNames(xyArrayRoomCount))
  console.table(xyArrayRoomCount);
  var traces2 = [ {
    values : values,
    labels : labels,
    type : 'pie'
  } ];
  plotWithTraces(traces2, "pie", "room types", "", "");


}



function plotWithTraces(traces, divId, title, xAxisTitle, yAxisTitle)
{

//funktion som tar emot listan traces som innehåller en eller många plotlydataset
  var layout = {
    title : title,
    xaxis : {
      title : xAxisTitle,
      titlefont : {
        family : 'Courier New, monospace',
        size : 18,
        color : '#7f7f7f'
      }
    },
    yaxis : {
      title : yAxisTitle,
      titlefont : {
        family : 'Courier New, monospace',
        size : 18,
        color : '#7f7f7f'
      }
    }
  };
  stupidvar = document.getElementById(divId);
  Plotly.plot(stupidvar, traces, layout);

}

function plot(x, y, divId, type, mode, title, xAxisTitle, yAxisTitle)
{

  //funktion som ritar ut en graf
  var layout = {
    title : title,
    xaxis : {
      title : xAxisTitle,
      titlefont : {
        family : 'Courier New, monospace',
        size : 18,
        color : '#7f7f7f'
      }
    },
    yaxis : {
      title : yAxisTitle,
      titlefont : {
        family : 'Courier New, monospace',
        size : 18,
        color : '#7f7f7f'
      }
    }
  };
  stupidvar = document.getElementById(divId);
  Plotly.plot(stupidvar, [ {
    x : x,
    y : y,
    type : type,
    mode : mode
  } ], layout);

}

function getDataByKeyAndValue(data, key, valuekey, value)
{
  // returnerar array med specifikt värde på annan nyckel
  var list = [];

  for ( var i = 0; i < data.length; i++)
  {
    var nydata = data[i];
    if (nydata[valuekey] == value)
    {
      list.push(nydata[key]);
    }

  }
  return list;
}

function getDataByKey(data, key)
{
  // returnerar hela jsontjofräset som en endimensionell array baserat på nyckel
  var list = [];

  for ( var i = 0; i < data.length; i++)
  {
    var nydata = data[i];
    list[i] = nydata[key]

  }
  return list;
}

function loadJsonData(url)
{

  // Hämtar jsondatat på riktigt och skickar det vidare main function
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function()
  {
    if (this.readyState == 4 && this.status == 200)
    {
      var myObj = JSON.parse(this.responseText);

      main(myObj);

    }
  };

  xmlhttp.open("GET", url, true);
  xmlhttp.send();

}
function count(data, key)
{
  // returnerar antalet träffar med samma värde uppdelat per nyckel, ex 4 st
  // uthyrningsenheter med 2 sovrum, 10 med 3 osv
  var count = [];

  for ( var i = 0; i < data.length; i++)
  {
    var nydata = data[i];
    // console.log(nydata[key]);
    if (nydata[key] != null)
    {
      if (isNaN(count[nydata[key]]))
      {
        count[nydata[key]] = 1;
      }
      else
      {
        count[nydata[key]]++;

      }
    }
    else
    {
      console.log("WARNING! Item " + i + " contains null value");
    }

  }
  // console.table(count);
  return count;
}

function getX(xyArray)
{
  var x = [];
  // arrayens längd blir x axeln även fast det saknas y värden i mitten

  for ( var i = 0; i < xyArray.length; i++)
  {
    x.push(i);
    // console.log(i);
  }

  return x;
}

function getY(xyArray)
{
  var y = [];

  for ( var i = 0; i < xyArray.length; i++)
  {
    if (typeof (xyArray[i]) == "undefined")
    {
      // sätter noll om undefined
      y.push(0);
    }
    else
    {
      y.push(xyArray[i]);

    }
  }

  return y;

}













// Gamla övningsuppgifter
function hejJson()
{
  var data = [ {
    "kundID" : 204,
    "kundNamn" : "Gunnar"
  }, {
    "kundID" : 195,
    "kundNamn" : "Lisa"
  }, {
    "kundID" : 54,
    "kundNamn" : "Olof"
  }, {
    "kundID" : 232,
    "kundNamn" : "Åsa"
  } ];

  for ( var i = 0; i < data.length; i++)
  {
    console.log(data[i].kundID + " med namn " + data[i].kundNamn);
  }
  console.log(JSON.stringify(data));
  console.log(data.length);
  var row1 = "";
  var row2 = "";
  for (i = 0; i < data.length; i++)
  {
    row1 += data[i].kundNamn + "\t";
    row2 += data[i].kundID + "\t";
    ;
  }

  console.log(row1);
  console.log(row2);

  console.table(data);

}

function ovning3()
{
  var minlista = [];
  for ( var i = 0; i < 10; i++)
  {
    minlista.push(i + 1);
    console.log("Stoppade in " + minlista[i]);
  }
  for (i = 0; i < minlista.length; i++)
  {
    minlista[i] = minlista[i] * 2;
    console.log("Dubblade på plats " + i + " till " + minlista[i]);

  }
  // kollar efter talet 8
  var hittade = false;

  for (i = 0; i < minlista.length; i++)
  {
    if (minlista[i] == 8)
    {
      console.log("HITTADE TALET " + minlista[i] + "!");
      hittade = true;
    }

  }
  if (hittade == false)
  {
    console.log("Hittade inte :(");

  }
  minlista.pop();
  minlista.push(100);
}

function calc()
{
  var textvalue = document.getElementById("rutan").value;
  console.log(textvalue);
  if (isNaN(textvalue))
  {
    console.log("inte ett nummer!");
    window.alert("inte ett nummer");
  }
  else
  {
    if (textvalue == 8)
    {
      console.log("Rätt tal!");
      window.alert("Rätt tal!");

    }
    else if (textvalue < 100)
    {
      console.log("FÖr litet tal");
      window.alert("För litet tal");
    }
    else if (textvalue > 500)
    {
      console.log("FÖr stort tal");
      window.alert("För stort tal");
    }
  }
}
function calc2(lista)
{

  var textvalue;
  for ( var i = 0; i < lista.length; i++)
  {
    textvalue = lista[i];
    if (isNaN(textvalue))
    {
      console.log("inte ett nummer!");
      window.alert("inte ett nummer");
    }
    else
    {
      if (textvalue == 8)
      {
        console.log("Rätt tal!");
        window.alert("Rätt tal!");

      }
      else if (textvalue < 100)
      {
        console.log("FÖr litet tal");
        window.alert("För litet tal");
      }
      else if (textvalue > 500)
      {
        console.log("FÖr stort tal");
        window.alert("För stort tal");
      }
    }
  }
}
function changeBg()
{

  document.body.style.backgroundColor = document.getElementById("changebg").value;
  console.log("Changed bg color to "
      + document.getElementById("changebg").value)
}
