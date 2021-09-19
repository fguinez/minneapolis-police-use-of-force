var width = 390;
var height = 680;

const parseTSV = (row) => ({
    ID:         parseInt(row.ID),
    NAME:       row.NAME,
    D:          row.D
});

const parseCSV = (row) => ({
    Is911Call:      row.Is911Call,
    SubjectInjury:  row.SubjectInjury,
    ForceType:      row.ForceType,
    Race:           row.Race,
    Sex:            row.Sex,
    EventAge:       parseInt(row.EventAge),
    Neighborhood:   row.Neighborhood
});

const body = d3.select("body");
const content = body.append('div')
    .attr('class', 'content');

// Animación inicial
const title = content.append('h1')
    .style('font-size', "4.5em")
    .text("Minneapolis")
    .transition()
    .delay(200)
    .text("Minneapolis|")
    .transition()
    .delay(200)
    .text("Minneapolis")
    .transition()
    .delay(200)
    .text("Minneapolis|")
    .transition()
    .delay(150)
    .text("Minneapolis");

const title_name = "Minneapolis: Violencia Policial y Racismo";
for (var i = 11; i <= title_name.length; i++) {
    title.transition()
        .delay(50 * i)
        .text(title_name.substr(0,i) + "|");
};
title.transition()
    .delay(1000 + 50 * title_name.length)
    .duration(500)
    .style('font-size', "2em")
    .text(title_name.substr(0,i));


const View = content
    .append('div')
    .style('display', 'inline');


const mapView  = View.append('span')
const dataView = View.append('span')

const map = mapView.append('svg')
    .attr("width", width   + "px")
    .attr("height", height + "px")
    .attr('class', "map");

map.attr('opacity', 0)
    .transition("tmap")
    .delay(2000 + 50 * title_name.length)
    .duration(1000)
    .attr('opacity', 100);

const data = mapView.append('svg')
    .attr("width", width   + "px")
    .attr("height", height + "px")
    .attr('class', "data");

const neigborhoodLabel = map.append('text')
    .attr('x', width - 28)
    .attr('y', 15)
    .attr('fill', "#2D2F30")
    .attr('text-anchor', "end")
    .attr('class', "mono bold");





getWidth = d3.scaleLinear()
    .domain([0, 1])
    .range([0, 350]);

getColor = (i, len) => {
    if (i == len-1) {
        return 'gray'
    }
    colors = ['#008000', '#F2B01F', '#ED1882', '#0953DE', '#7600F5', '#09DEC4', '#802700', '#EDEC00'];
    return colors[i];
}

const option = (portion, label) => ({
    portion:     portion,
    percentage:  (portion * 100).toFixed(2) + '%',
    label:       label,
});

var currentData = [];

initX =               25;
initYIs911Call =      70;
initYSubjectInjury = 190;
initYForceType =     310;
initYRace =          430;
initYSex =           550;

const n_cases = data.append('text')
    .text(`Casos: ${currentData.length}`)
    .attr('x', 35)
    .attr('y', initYIs911Call - 30)
    .attr('text-anchor', "start")
    .attr('class', 'label');

data.append('circle')
    .attr('cx', width - 25)
    .attr('cy', initYIs911Call - 33)
    .attr('r', 6)
    .attr('fill', 'gray');
data.append('text')
    .text("Sin registro")
    .attr('x', width - 35)
    .attr('y', initYIs911Call - 30)
    .attr('text-anchor', "end")
    .attr('class', 'label');

Is911CallChart     = data.append('g')
SubjectInjuryChart = data.append('g')
ForceTypeChart     = data.append('g')
RaceChart          = data.append('g')
SexChart           = data.append('g')

Is911CallChart.append('text')
    .attr('x', initX)
    .attr('y', initYIs911Call)
    .text("Llamada al 911")
    .attr('class', "atribute")
    .append('title')
    .text("Describe si se realizó una llamada al 911 relacionada con el suceso.");

SubjectInjuryChart.append('text')
    .attr('x', initX)
    .attr('y', initYSubjectInjury)
    .text("Víctima con lesiones")
    .attr('class', "atribute")
    .append('title')
    .text("Describe si la víctima de violencia sufrió lesiones.");

ForceTypeChart.append('text')
    .attr('x', initX)
    .attr('y', initYForceType)
    .text("Tipo de fuerza ejercida")
    .attr('class', "atribute")
    .append('title')
    .text("Detalla el tipo de fuerza ejercida por la policía.");

RaceChart.append('text')
    .attr('x', initX)
    .attr('y', initYRace)
    .text("Etnia")
    .attr('class', "atribute")
    .append('title')
    .text("Especifica la etnia con la que se identificó a la víctima de violencia.");

SexChart.append('text')
    .attr('x', initX)
    .attr('y', initYSex)
    .text("Sexo")
    .attr('class', "atribute")
    .append('title')
    .text("Especifíca el sexo de la víctima de violencia.");


blind = data.append('rect')
    .attr('x', 0)
    .attr('y', 0)
    .attr('fill', 'white')
    .attr('width', width)
    .attr('height', height)
    .attr('opacity', 100);

const subtitle = data.append('text');
const subtitle_text_1 = "Presiona un barrio";
const subtitle_text_2 = "para analizar sus datos";
const subtitle_text_3 = "de violencia policial";

subtitle.text(subtitle_text_1)
    .attr('class', "subtitle")
    .attr('x', width / 2)
    .attr('y', height / 2 - 50)
    .attr('text-anchor', "middle")
    .style('opacity', 0)
    .transition()
    .delay(2000 + 100 * title_name.length)
    .duration(1000)
    .style('opacity', 100);
subtitle.append('tspan')
    .attr('x', width / 2)
    .attr('dy', "2em")
    .text(subtitle_text_2)
subtitle.append('tspan')
    .attr('x', width / 2)
    .attr('dy', "2em")
    .text(subtitle_text_3)

function uptadeAtribute(chart, options, initY) {
    advance = [initX]
    chart.selectAll('rect')
        .data(options)
        .join('rect')
        .attr('class', "bar")
        .attr('y', initY + 10)
        .attr("height", 60 + "px")
        .transition()
        .duration(1000)
        .attr("width", (option, i) => {
            advance.push(advance[i] + getWidth(option.portion));
            return getWidth(option.portion) + "px";
        })
        .attr('x', (option, i) => advance[i])
        .attr('fill', (option, i, data) => {
            if (option.label == "Otro" | option.label == "Otra") {
                return "darkgray"
            };
            return getColor(i, data.length);
        });
    chart.selectAll('text.percentage')
        .data(options)
        .join('text')
        .attr('class', "percentage")
        .attr('text-anchor', "middle")
        .text((option) => option.percentage)
        .attr('transform', (option, i) => {
            transY = initY + 40;
            return `translate(0,${transY*2}) rotate(-90)`
        })
        .attr('x', initY + 40)
        .transition()
        .duration(1000)
        .attr('y', (option, i) => {
            return 4 + advance[i] + (getWidth(option.portion) / 2)
        })
    chart.selectAll('text.label')
        .data(options)
        .join('text')
        .attr('class', "label")
        .attr('y', initY + 85)
        .attr('text-anchor', "middle")
        .text((option) => option.label)
        .transition()
        .duration(1000)
        .attr('x', (option, i) => {
            return advance[i] + (getWidth(option.portion) / 2)
        });
}

function updateIs911Call(data) {
    total = currentData.length;
    options = []
    if (total != 0) {
        p1 = currentData.filter((row) => row.Is911Call == 'Yes').length / total
        p2 = currentData.filter((row) => row.Is911Call == 'No').length / total
        p3 = 1 - p1 - p2
        options = [option(p1, 'Si'), option(p2, 'No'), option(p3, '')]
    }
    uptadeAtribute(Is911CallChart, options, initYIs911Call)
};

function updateSubjectInjury(data) {
    total = currentData.length;
    options = []
    if (total != 0) {
        p1 = currentData.filter((row) => row.SubjectInjury == 'Yes').length / total
        p2 = currentData.filter((row) => row.SubjectInjury == 'No').length / total
        p3 = 1 - p1 - p2
        options = [option(p1, 'Si'), option(p2, 'No'), option(p3, '')]
    }
    uptadeAtribute(SubjectInjuryChart, options, initYSubjectInjury)
};

function updateForceType(data) {
    total = currentData.length;
    options = []
    if (total != 0) {
        p1 = currentData.filter((row) => row.ForceType == 'Bodily Force').length / total
        p2 = currentData.filter((row) => row.ForceType == 'Taser').length / total
        p3 = currentData.filter((row) => row.ForceType == 'Chemical Irritant').length / total
        p4 = currentData.filter((row) => row.ForceType == 'Police K9 Bite').length / total
        p5 = currentData.filter((row) => row.ForceType == 'Baton').length / total

        p6 = currentData.filter((row) => row.ForceType == 'Firearm').length / total
        p6 += currentData.filter((row) => row.ForceType == 'Less Lethal Projectile').length / total
        p6 += currentData.filter((row) => row.ForceType == 'Gun Point Display').length / total

        p7 = currentData.filter((row) => row.ForceType == 'Improvised Weapon').length / total
        p7 += currentData.filter((row) => row.ForceType == 'Less Lethal').length / total
        p7 += currentData.filter((row) => row.ForceType == 'Maximal Restraint Technique').length / total
        p8 = 1 - p1 - p2 - p3 - p4 - p5 - p6 - p7
        options = [
            option(p1, 'Corporal'),
            option(p2, 'Taser'),
            option(p3, 'Químico'),
            option(p4, 'Perro'),
            option(p5, 'Bastón'),
            option(p6, 'Arma'),
            option(p7, 'Otro'),
            option(p8, '')
        ]
        
        to_other = 0;
        options = options.map((opt) => {
            if (opt.label == 'Otro') {
                opt = option(to_other + opt.portion, 'Otro')
            } else if ((opt.portion < 0.1) & (opt.label != '')) {
                to_other += opt.portion;
                opt.portion = 0
                opt.percentage = ""
                opt.label = ""
            };
            return opt
        });
    }
    uptadeAtribute(ForceTypeChart, options, initYForceType)
};

function updateRace(data) {
    total = currentData.length;
    options = []
    if (total != 0) {
        p1 = currentData.filter((row) => row.Race == 'Black').length / total
        p2 = currentData.filter((row) => row.Race == 'White').length / total
        p3 = currentData.filter((row) => row.Race == 'Asian').length / total
        p4 = currentData.filter((row) => row.Race == 'Native American').length / total
        p5 = currentData.filter((row) => row.Race == 'Pacific Islander').length / total
        p6 = currentData.filter((row) => row.Race == 'Other / Mixed Race').length / total
        p6 += currentData.filter((row) => row.Race == 'Unknown').length / total
        p7 = 1 - p1 - p2 - p3 - p4 - p5 -p6
        options = [
            option(p1, 'Negra'),
            option(p2, 'Blanca'),
            option(p3, 'Asiat.'),
            option(p4, 'Americana'),
            option(p5, 'Polinesio'),
            option(p6, 'Otra'),
            option(p7, '')
        ]
        
        to_other = 0;
        options = options.map((opt) => {
            if (opt.label == 'Otra') {
                opt = option(to_other + opt.portion, 'Otra')
            } else if ((opt.portion < 0.1) & (opt.label != '')) {
                to_other += opt.portion;
                opt.portion = 0
                opt.percentage = ""
                opt.label = ""
            };
            return opt
        });
    }
    uptadeAtribute(RaceChart, options, initYRace)
};

function updateSex(data) {
    total = currentData.length;
    options = []
    if (total != 0) {
        p1 = currentData.filter((row) => row.Sex == 'Male').length / total
        p2 = currentData.filter((row) => row.Sex == 'Female').length / total
        p3 = 1 - p1 - p2
        options = [option(p1, 'Masculino'), option(p2, 'Femenino'), option(p3, '')]
    }
    uptadeAtribute(SexChart, options, initYSex)
};


function updateGraphs(data) {
    updateIs911Call(data);
    updateSubjectInjury(data);
    updateForceType(data);
    updateRace(data);
    updateSex(data);
    n_cases.text(`Casos: ${currentData.length}`)
    if (currentData.length == 0) {
        blind
            .attr('width', width)
            .transition()
            .duration(1000)
            .attr('opacity', 100);
        subtitle.transition()
            .delay(2000)
            .duration(1000)
            .style('opacity', 100)
    } else {
        subtitle.transition()
            .duration(300)
            .style('opacity', 0)
        blind
            .transition()
            .duration(1000)
            .attr('opacity', 0)
            .attr('width', 0);
    };
}

function updateData(path, data) {
    var path_class = path.attributes.class.value
    if (path_class == "selected") {
        currentData = currentData.concat(data.filter((row) => row.Neighborhood == path.id))
    } else if (path_class == "neigborhood") {
        currentData = currentData.filter((row) => row.Neighborhood != path.id)
    }
    updateGraphs(data);
};


// Buttons
function selectAllNeigborhoods(data) {
    d3.selectAll('.neigborhood')
        .attr('class', 'selected')
        .transition()
        .attr("fill", 'green');
    currentData = data;
    updateGraphs(data);
};

function removeAllNeigborhoods(data) {
    d3.selectAll('.selected')
        .attr('class', 'neigborhood')
        .transition()
        .attr("fill", 'black');
    currentData = [];
    updateGraphs(data);
};

d3.csv('Police_Use_of_Force.csv', parseCSV).then((data) => {
d3.tsv('neigborhoods.tsv', parseTSV).then((neigborhoods) => {
    map.selectAll('path')
        .data(neigborhoods)
        .join('path')
        .attr('class', 'neigborhood')
        .attr('id', (n) => n.NAME)
        .attr('d',  (n) => n.D)
        .attr('fill', 'black')
        .on("mouseenter", (event, n) => {
            neigborhoodLabel.text(n.NAME)
        })
        .on("mouseleave", () => neigborhoodLabel.text(""))
        .on("click", function() {
            d3.select(this)
                .attr("class", (d, i, neigborhood) => {
                    if (neigborhood[0].attributes.class.value == "selected") {
                        return "neigborhood";
                    } else {
                        return "selected";
                    };
                })
                .attr("fill", (d, i, neigborhood) => {
                    if (neigborhood[0].attributes.class.value == "neigborhood") {
                        return 'black';
                    } else {
                        return "green";
                    };
                });
            updateData(this, data);
        });
            
        const buttons = body.append('div')
            .attr('class', "buttons")
        
        buttons.style('opacity', 0)
            .transition("tmap")
            .delay(1500 + 50 * title_name.length)
            .duration(1000)
            .style('opacity', 100);

        buttons.append('button')
            .attr('class', "button")
            .text("Seleccionar todo")
            .on("click", () => selectAllNeigborhoods(data));
            
        buttons.append('button')
            .attr('class', "button")
            .attr('y', "50px")
            .text("Borrar selección")
            .on("click", () => removeAllNeigborhoods(data));
});
});
