
class Table {

  constructor(teamData, treeObject) {
    this.tree = treeObject;

    this.tableElements = teamData.slice(0, teamData.size); //

    this.teamData = teamData;

    this.tableHeaders = ["Delta Goals", "Result", "Wins", "Losses", "TotalGames"];

    this.cell = {
      "width": 70,
      "height": 20,
      "buffer": 15
    };

    this.bar = {
      "height": 20
    };

    this.goalsMadeHeader = 'Goals Made';
    this.goalsConcededHeader = 'Goals Conceded';

    this.goalScale = d3.scaleLinear()
      .domain([0, d3.max([d3.max(this.teamData, d => d.value[this.goalsMadeHeader]), d3.max(this.teamData, d => d.value[this.goalsConcededHeader])])])
      .range([10,135]);

    this.gameScale = d3.scaleLinear()
      .domain([0, d3.max(this.teamData, d => d.value.TotalGames)]);

    this.aggregateColorScale = d3.scaleLinear()
      .domain([0, d3.max(this.teamData, d => d.value.TotalGames)])
      .range(['#ece2f0', '#016450']);
  }

  createTable() {
    let goalAxis = d3.axisTop()
      .scale(this.goalScale);

    d3.select("#goalHeader")
      .append("svg")
      .attr("height", 25)
      .attr("width", 150)
      .append("g")
      .attr("transform", "translate(0,20) scale(1, 1)")
      .call(goalAxis);

    //team sort
    d3.select("#team")
      .on("click", function(){
        this.collapseList();
        let element = document.getElementById("team");
        if(!element.classList.contains("ascending")){
          this.tableElements.sort(function(a,b){
            if(a.key < b.key) return -1;
            if(a.key > b.key) return 1;
            return 0;
          });
          element.classList += " ascending";
        } else {
            this.tableElements.sort(function(a,b){
              if(a.key > b.key) return -1;
              if(a.key < b.key) return 1;
              return 0;
            });
            element.classList.remove("ascending");
        }
        this.updateTable();
      }.bind(this));
    //goals sort
    d3.select("#goals")
      .on("click", function(){
        this.collapseList();
        let element = document.getElementById("goals");
        if(!element.classList.contains("ascending")){
          this.tableElements.sort(function(a,b){
            if(a.value["Goals Made"] > b.value["Goals Made"]) return -1;
            if(a.value["Goals Made"] < b.value["Goals Made"]) return 1;
            return 0;
          });
          element.classList += " ascending";
        } else {
            this.tableElements.sort(function(a,b){
              if(a.value["Goals Made"] < b.value["Goals Made"]) return -1;
              if(a.value["Goals Made"] > b.value["Goals Made"]) return 1;
              return 0;
            });
            element.classList.remove("ascending");
        }
        this.updateTable();
      }.bind(this));
    //result
    d3.select("#round")
      .on("click", function(){
        this.collapseList();
        let element = document.getElementById("round");
        if(!element.classList.contains("ascending")){
          this.tableElements.sort(function(a,b){
            if(a.value.Result.ranking > b.value.Result.ranking) return -1;
            if(a.value.Result.ranking < b.value.Result.ranking) return 1;
            return 0;
          });
          element.classList += " ascending";
        } else {
            this.tableElements.sort(function(a,b){
              if(a.value.Result.ranking < b.value.Result.ranking) return -1;
              if(a.value.Result.ranking > b.value.Result.ranking) return 1;
              return 0;
            });
            element.classList.remove("ascending");
        }
        this.updateTable();
      }.bind(this));
    //wins
    d3.select("#wins")
      .on("click", function(){
        this.collapseList();
        let element = document.getElementById("wins");
        if(!element.classList.contains("ascending")){
          this.tableElements.sort(function(a,b){
            if(a.value.Wins > b.value.Wins) return -1;
            if(a.value.Wins < b.value.Wins) return 1;
            return 0;
          });
            element.classList += " ascending";
        } else {
            this.tableElements.sort(function(a,b){
              if(a.value.Wins < b.value.Wins) return -1;
              if(a.value.Wins > b.value.Wins) return 1;
              return 0;
            });
            element.classList.remove("ascending");
        }
        this.updateTable();
      }.bind(this));
    //losses
    d3.select("#losses")
      .on("click", function(){
        this.collapseList();
        let element = document.getElementById("losses");
        if(!element.classList.contains("ascending")){
          this.tableElements.sort(function(a,b){
            if(a.value.Losses > b.value.Losses) return -1;
            if(a.value.Losses < b.value.Losses) return 1;
            return 0;
          });
            element.classList += " ascending";
        } else {
            this.tableElements.sort(function(a,b){
              if(a.value.Losses < b.value.Losses) return -1;
              if(a.value.Losses > b.value.Losses) return 1;
              return 0;
            });
            element.classList.remove("ascending");
        }
        this.updateTable();
      }.bind(this));
    //totalGames
    d3.select("#totalGames")
      .on("click", function(){
        this.collapseList();
        let element = document.getElementById("totalGames");
        if(!element.classList.contains("ascending")){
          this.tableElements.sort(function(a,b){
            if(a.value.TotalGames > b.value.TotalGames) return -1;
            if(a.value.TotalGames < b.value.TotalGames) return 1;
            return 0;
          });
            element.classList += " ascending";
        } else {
            this.tableElements.sort(function(a,b){
              if(a.value.TotalGames < b.value.TotalGames) return -1;
              if(a.value.TotalGames > b.value.TotalGames) return 1;
              return 0;
            });
            element.classList.remove("ascending");
        }
        this.updateTable();
      }.bind(this));


  }

  updateTable() {
    let table = d3.select("#matchTable").select("tBody");
    table.selectAll("tr").
      data(this.tableElements).
      enter()
      .append("tr")
      .attr("class", d=>d.value.type)
      .on("click", function(d, i){
        if(d.value.type=="aggregate"){
          this.updateList(i);
        }
      }.bind(this))
      .on("mouseover", function(d){
        this.tree.updateTree(d);
      }.bind(this))
      .on("mouseout", function(d){
        this.tree.clearTree();
      }.bind(this));

    let td = table.selectAll("tr").selectAll("td").data(function(d){
      let data = [];
      let result = [['vis', 'text'],['value', d.value.Result.label]];
      data.push(new Map(result));
      if(d.value.type=="aggregate"){
        let goals = [['vis', 'goals'],['value', [d.value["Goals Made"],d.value["Goals Conceded"]]], ["type", "aggregate"]];
        data.push(new Map(goals));
        let team = [['vis', 'header'],['value', d.key]];
        data.push(new Map(team));
        let wins = [['vis', 'bar'],['value', d.value.Wins]];
        data.push(new Map(wins));
        let losses = [['vis', 'bar'],['value', d.value.Losses]];
        data.push(new Map(losses));
        let totalGames = [['vis', 'bar'],['value', d.value.TotalGames]];
        data.push(new Map(totalGames));
      }else if (d.value.type=="game"){
        let goals = [['vis', 'goals'],['value', [d.value["Goals Made"],d.value["Goals Conceded"]]], ["type", "game"]];
        data.push(new Map(goals));
        let team = [['vis', 'header'],['value', "x" + d.key]];
        data.push(new Map(team));
        let wins = [['vis', 'bar'],['value', 0]];
        data.push(new Map(wins));
        let losses = [['vis', 'bar'],['value', 0]];
        data.push(new Map(losses));
        let totalGames = [['vis', 'bar'],['value', 0]];
        data.push(new Map(totalGames));
      }
      return data;
    })
    .enter();

    // Append th elements for the Team Names
    td.filter(function(d){
      return d.get('vis')=='header';
    })
    .append("th")
    .html(d => d.get('value'));

    //goals
    let goalSVG = td.filter(function(d){
      return d.get('vis')=='goals';
    })
    .append("td")
    .append("svg")
    .attr("height", this.cell.height)
    .attr("width", 150)
    .attr("transform", "translate(-4,0) scale(1, 1)");
    //goal diff
    goalSVG.append("rect")
      .attr("class", "goalBar")
      .attr("fill", function(d){
        if(d.get("value")[0] > d.get("value")[1]){
          return "#034e7b"
        }
        return "#cb181d";
      })
      .attr("x", d => this.goalScale(d3.min([d.get('value')[0], d.get('value')[1]])))
      .attr("y", function(d){
        if(d.get("type")=="game"){
          return 5;
        }
      })
      .attr("height", function(d){
        if(d.get("type")=="game"){
          return 8;
        }
        return 20;
      })
      .attr("width", d => this.goalScale(Math.abs(d.get('value')[0]-d.get('value')[1]))-10);
      //conceded
      goalSVG.append("circle")
      .attr("cx", d => this.goalScale(d.get('value')[1]))
      .attr("fill", function(d){
        if(d.get('type')=="game"){
          return "white";
        }
        if(d.get('value')[0]==d.get('value')[1]){
          return "#b1b1b1"
        }
        return "#cb181d";
      })
      .attr("stroke", function(d){
        if(d.get('type')=="game"){
          if(d.get('value')[0]==d.get('value')[1]){
            return "#b1b1b1"
          }
          return "#cb181d";
        }
      })
      .attr("cy", 10)
      .attr("r", function(d){
        if(d.get('type')=="game"){
          return 7;
        }
        return 10;
      })
      .attr("class", "goalCircle");
    //made
    goalSVG.append("circle")
    .attr("cx", d => this.goalScale(d.get('value')[0]))
    .attr("fill", function(d){
      if(d.get('type')=="game"){
        return "white";
      }
      if(d.get('value')[0]==d.get('value')[1]){
        return "#b1b1b1"
      }
      return "#034e7b";
    })
    .attr("stroke", function(d){
      if(d.get('type')=="game"){
        if(d.get('value')[0]==d.get('value')[1]){
          return "#b1b1b1"
        }
        return "#034e7b";
      }

    })
    .attr("cy", 10)
    .attr("r", function(d){
      if(d.get('type')=="game"){
        return 7;
      }
      return 10;
    })
    .attr("class", "goalCircle");

    //result
    td.filter(function(d){
      return d.get('vis')=='text';
    })
    .append("td")
    .html(d => d.get('value'));

    //bars
    let barSVG = td.filter(function(d){
      return d.get('vis')=='bar';
    })
    .append("td")
    .append("svg")
    .attr("height", this.cell.height)
    .attr("width", this.cell.width)
    .attr("transform", "translate(-4,0) scale(1, 1)");

    barSVG.append("rect")
    .attr("fill", d => this.aggregateColorScale(d.get('value')))
    .attr("height", this.cell.height)
    .attr("width", d => this.gameScale(d.get('value'))*this.cell.width);

    barSVG.append("text")
    .attr("class", "label")
    .text(d => d.get('value'))
    .attr("x", d => this.gameScale(d.get('value'))*this.cell.width - 10)
    .attr("y", "15");
  }

  updateList(i) {
    if(this.tableElements.length - 1 > i && this.tableElements[i+1].value.type=="game"){
      this.collapseList();
      this.updateTable();
      return;
    }
    let team = this.tableElements[i];
    this.collapseList();
    let index;
    for(let j in this.tableElements){
      if(team==this.tableElements[j]){
        index = j;
      }
    }
    let games = this.tableElements[index].value.games;
    for(let k in games){
      this.tableElements.splice(Number(index)+Number(k)+1, 0, games[k]);
    }
    this.updateTable();
  }

  collapseList() {
    for (let i = this.tableElements.length - 1; i>=0; i--){
      if(this.tableElements[i].value.type=="game"){
        this.tableElements.splice(i, 1);
      }
    }
    d3.select("#matchTable").select("tBody").selectAll("tr").remove();
  }
}
