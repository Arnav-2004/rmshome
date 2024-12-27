const categories = [
  "algebra",
  "algebraic-geometry",
  "complex-analysis",
  "functional-analysis",
  "geometry-and-topology",
  "groups-and-their-representation",
  "harmonic-analysis",
  "partial-differential-equations",
  "probability-theory",
  "number-theory",
];

fetch("/data/symposium-speakers.json")
  .then(function (response) {
    return response.json();
  })
  .then(function (items) {
    for (category of categories) {
      let placeholder = document
        .querySelector(`#${category}`)
        .querySelector("#speakers-data");
      let out = "";

      for (let item of items) {
        if (item.category == category) {
          out += `
                <tr>
                    <td>${item.name}</td>
                    <td>${item.institute}</td>
                    <td>
                        ${
                          item.link
                            ? `<a class="download-link" href=${item.link}>
                              <i class="fa-solid fa-download"></i>
                            </a>`
                            : ``
                        }
                    </td>
                </tr>
            `;
        }
      }

      placeholder.innerHTML = out;
    }
  });
