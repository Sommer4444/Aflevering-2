// Constructor funktion med de 4 informationer.//
function Album(artist, album, totalTracks, rating) {
  this.artist = artist;
  this.album = album;
  this.totalTracks = totalTracks;
  this.rating = rating;        
}

// Denne funktion laver tabellen og indsætter de 4 informationer albummene.//
function displayAlbumsInTable(albums, parentid) {
  let parentElement = document.getElementById(parentid);

  let tableHTML = `
    <table id="albumTable" border="1">
      <thead>
        <tr>
          <th>Artist</th>
          <th>Album</th>
          <th>Rating</th>
          <th>Total Tracks</th>
        </tr>
      </thead>
  <tbody>`;

  // Et forEach loop bruges så albumdata bliver indsat i tabellen. forEach bruges for at processen gentages ved alle albumsne.//
  albums.forEach(album => {
    tableHTML += `
      <tr>
        <td>${album.artist}</td>
        <td>${album.album}</td>
        <td>${album.rating}</td>
        <td>${album.totalTracks}</td>
      </tr>`;
  });

  tableHTML += `</tbody></table>`;

  // Tabel Indsættes på webside.//
  parentElement.innerHTML = tableHTML;
}

// Henter JSON filen "albums.json". De 4 objekter bliver lavet og bliver indsat i tabel.//
fetchContent("albums.json").then((albums) => {
  let albumObjects = albums.map(albumData => 
      new Album(
        albumData.artistName,
        albumData.albumName,
        albumData.trackList.length,
        albumData.rating
    )
  );


  // Albumsne præsenteres i tabellen.//
  displayAlbumsInTable(albumObjects, "content");
});


// Det her skal jo som sagt bare være her for at kabalen går op.//
async function fetchContent(url) {
  let request = await fetch(url);
  let json = await request.json();
  return json;
}

// Min knap der viser/skjuler tabellen
function toggleTable() {
  const table = document.getElementById("albumTable");
  const button = document.querySelector("button");

  if (table.style.display === "none" || table.style.display === "") {
    table.style.display = "table";
    button.textContent = "Skjul Musikarkiv";
  } else {
    table.style.display = "none";
    button.textContent = "Vis Musikarkiv";
  }
}