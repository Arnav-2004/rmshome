fetch("/data/schedule.json")
  .then(function (response) {
    return response.json();
  })
  .then(function (items) {
    let placeholder = document.querySelector("#schedule");
    let out = ``;
    items.map((item) => {
      out += `
      <div style="margin-top: 5px">
        <button type="button" class="collapsible">${item.category}</button>
        <div class="content" style="background-color: #e3e8e9">
      `;
      if (item.subcategory) {
        if (item.category == "Symposia Talks") {
          let colors = ["#a1c3e7", "#d1e9fd", "#bddaf5"];
          let i = 0;
          item.subcategory.map((sc) => {
            if (sc.data.length <= 0) return;
            out += `
          
          <div style="padding: 4px 2px">
            <button type="button" class="collapsible sub-collapsible" id="sub-collapsible">
              ${sc.category}
            </button>
            <div class="content" style="padding: 0 8px; background-color: white">
              ${
                sc.venue
                  ? `<h3 style="text-align: center; height: 40px; width: 100%; font-weight: bold; color: #FF6961">Venue: ${sc.venue}</h3>`
                  : ``
              }
              <div class="table-responsive" style="padding: 4px">
                <table class="schedule-table table table-bordered align-middle abot-txt-innr">
                  <thead>
                    <tr>
                      <td>Chair</td>
                      <td>Time</td>
                      <td>Speaker</td>
                      <td>Title of the talk</td>
                      <td>Link</td>
                    </tr>
                  </thead>

                  <tbody>
                    `;

            sc.data.map((d) => {
              if (d.chair) i++;
              if (i > colors.length - 1) i = 0;

              if (d.date) {
                out += `<tr style="height: 40px">
                <td colspan="5" style="text-align: center !important; background-color:#FAF9F6 !important; width: 100%; font-weight: bold;">${d.date}</td>
              </tr>`;

                i = 1;
              }

              out += `
            <tr style="height: 40px; background-color: ${colors[i]} !important">
                      ${
                        d.chair
                          ? `<td rowspan="2" style="min-width: fit-content; vertical-align : middle; text-wrap: nowrap; text-align: center !important;">${
                              d.chair || ` `
                            }</td>`
                          : ``
                      }
                      <td style="min-width: fit-content; text-wrap: nowrap">${
                        d.time
                      }</td>
                      <td style="min-width: fit-content;">${d.name}</td>
                      <td>${d.title}</td>
                      <td>
                      
                        ${
                          d.link
                            ? `<a class="download-link" href=${d.link}><i class="fa-solid fa-download"></i></a>`
                            : ` `
                        }
                      
                    </td>
                    </tr>
                  
        `;
            });

            out += `
            </tbody>
                </table>
              </div>
            </div>
          </div>
          `;
          });
        } else if (item.category == "Contributory Talks") {
          let colors = ["#a1c3e7", "#d1e9fd", "#bddaf5"];
          let i = 0;
          item.subcategory.map((sc) => {
            if (sc.data.length <= 0) return;
            let j = 0;

            out += `
            <div style="padding: 4px 2px">
            <button type="button" class="collapsible sub-collapsible" id="sub-collapsible">
              ${sc.category}
            </button>
            <div class="content" style="padding: 0 8px; background-color: white">
            `;

            sc.data.map((d) => {
              if (d.chair) i++;
              if (i > colors.length - 1) i = 0;

              if (d.date) {
                if (j == 1) {
                  out += `
                    </tbody>
                    </table>
                    </div>

                    </br>
                  `;
                }
                out += `
                    </br>
                <h2 style="color: #2f5179; margin: 1px; padding: 5px; text-align: center;">
                  ${d.date}
                </h2>

                <div class="table-responsive" style="padding: 4px">
                <table class="schedule-table table table-bordered align-middle abot-txt-innr">
                  <thead>
                    <tr>
                      <td>Chair</td>
                      <td>Time</td>
                      <td>Speaker</td>
                      <td>Title of the talk</td>
                      <td>Link</td>
                    </tr>
                  </thead>

                  <tbody>
                `;
                j = 1;
              }

              if (d.venue) {
                out += `<tr style="height: 40px">
                <td colspan="5" style="text-align: center !important; background-color:#FAF9F6 !important; width: 100%; font-weight: bold; color: #FF6961">Venue: ${d.venue}</td>
              </tr>`;

                i = 1;
              }

              out += `
                    <tr style="height: 40px; background-color: ${
                      colors[i]
                    } !important">
                      ${
                        d.chair
                          ? `<td rowspan=${
                              d.speakers
                            } style="min-width: fit-content; vertical-align : middle; text-wrap: nowrap; text-align: center !important;">${
                              d.chair || ` `
                            }</td>`
                          : ``
                      }
                      ${
                        d.time
                          ? `<td rowspan=${
                              d.speakers
                            } style="min-width: fit-content; vertical-align : middle; text-wrap: nowrap; text-align: center !important;">${
                              d.time || ` `
                            }</td>`
                          : ``
                      }
                      <td style="">${d.name}</td>
                      <td>${d.title}</td>
                      <td>
                      
                        ${
                          d.link
                            ? `<a class="download-link" href=${d.link}><i class="fa-solid fa-download"></i></a>`
                            : ` `
                        }
                      
                    </td>
                    </tr>
                  
              `;
            });

            out += ` 
            </tbody>
            </table>
            </div>
            </div>
            </div>
            `;
          });
        }
      } else {
        out += `
          <div class="table-responsive table-div" style="padding: 4px 0">
            <table class="schedule-table table table-bordered align-middle abot-txt-innr">
              <thead>
                <tr>
                  <td>Date</td>
                  <td>Time</td>
                  <td>Speaker</td>
                  <td>Title of the talk</td>
                  <td>Link</td>
                </tr>
              </thead>

              <tbody>

      `;

        item.data.map((d) => {
          if (d.venue) {
            out += `<tr style="height: 40px">
                <td colspan="5" style="text-align: center !important; background-color:#FAF9F6 !important; width: 100%; font-weight: bold; color: #FF6961">Venue: ${d.venue}</td>
              </tr>`;
          }
          out += `
                <tr>
                  <td style="min-width: fit-content; text-wrap: nowrap">${
                    d.date
                  }</td>
                  <td style="min-width: fit-content; text-wrap: nowrap">${
                    d.time
                  }</td>
                  <td style="min-width: fit-content;">${d.name}</td>
                  <td>${d.title}</td>
                  <td>
                      
                        ${
                          item.link
                            ? `<a class="download-link" href=${item.link}><i class="fa-solid fa-download"></i></a>`
                            : ``
                        }
                      
                    </td>
                </tr>

          `;
        });

        out += `
        </tbody>
            </table>
          </div>
        `;
      }

      out += `</div>
        </div>`;
    });

    placeholder.innerHTML = out;
  });

setTimeout(() => {
  var coll = document.getElementsByClassName("collapsible");
  var i;

  for (i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function () {
      this.classList.toggle("active");
      var content = this.nextElementSibling;
      content.classList.toggle("table-responsive");
      if (content.style.display === "block") {
        content.style.display = "none";
      } else {
        content.style.display = "block";
      }
    });
  }
}, 2000);
