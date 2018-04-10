(function(d3, localization) {
  "use strict";

  /*******************************************************************************************
         DIAGRAMME A COORDONNEES PARALLELES DES FACTEURS DE RISQUES POUR CHAQUE TYPE DE CANCER
   *******************************************************************************************/

var data=[['Poumons','Tabagisme',85],
['Poumons','Autres',15],
['Peau','Rayonnement ultraviolet',90],
['Peau','Antécédents familiaux',5],
['Peau','Autres',5],
['Pancréas','Tabagisme',17],
['Pancréas','Surcharge pondérale',7],
['Pancréas','Consommation insuffisante de légumes',9],
['Pancréas','Consommation insuffisante de fruits',4],
['Pancréas','Consommation d\'alcool',0.6],
['Pancréas','Autres',62.4],
['Foie','Hépatite B',23],
['Foie','Hépatite C',40],
['Foie','Consommation d\'alcool',10],
['Foie','Tabagisme',10],
['Foie','Autres',17],
['Sein','L\'âge',66],
['Sein','Antécédents familiaux',5],
['Sein','Antécédents personnels',15],
['Sein','Autres',14],
['Colorectal','L\'âge',90],
['Colorectal','Autres',10],
['Prostate','Antécédents familiaux',15],
['Prostate','L\'âge',66],
['Prostate','Autres',19]
];
var color ={Poumons:"#3366CC", Peau:"#DC3912", Pancréas:"#FF9900", Foie:"#109618", Prostate:"#990099", Sein:"#0099C6", Colorectal:"#DA81F5"};
var svg = d3.select("body").append("svg").attr("width", 1500).attr("height", 800);

svg.append("text").attr("x",250).attr("y",70)
	.attr("class","header");
	
var g =svg.append("g").attr("transform","translate(650,18)");
var bp=viz.bP()
		.data(data)
		.min(12)
		.pad(1)
		.height(650)
		.width(450)
		.barSize(35)
		.fill(d=>color[d.primary]);
		
	g.call(bp)
	g.append("text").attr("x",-50).attr("y",-8).style("text-anchor","middle").text("Type de cancer");
	g.append("text").attr("x", 450).attr("y",-8).style("text-anchor","middle").text("Facteurs de risque");
	
	g.selectAll(".mainBars")
		.on("mouseover",mouseover)
		.on("mouseout",mouseout);

	g.selectAll(".mainBars").append("text").attr("class","label")
		.attr("x",d=>(d.part=="primary"? -40: 50))
		.attr("y",d=>+6)
		.text(d=>d.key)
		.attr("text-anchor",d=>(d.part=="primary"? "end": "start"));
	
	g.selectAll(".mainBars").append("text").attr("class","perc")
		.attr("x",d=>(d.part=="primary"? -750: 300))
		.attr("y",d=>+6)
		.text(function(d){ return d3.format("0.0%")(d.percent)})
		.attr("text-anchor",d=>(d.part=="primary"? "end": "start"));
function mouseover(d){
		bp.mouseover(d);
		
		g.selectAll(".mainBars").select(".perc")
		.text(function(d){ return d3.format("0.0%")(d.percent)});
}
function mouseout(d){
		bp.mouseout(d);
		
		g.selectAll(".mainBars").select(".perc")
		.text(function(d){ return d3.format("0.0%")(d.percent)});
}
d3.select(self.frameElement).style("height", "800px");
})(d3, localization);