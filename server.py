from heapq import heapify
import heapq
from http import client
from flask import Flask
from flask import render_template, url_for
from flask import Response, request, jsonify
app = Flask(__name__)

data = {
    "1": {
        "id": "1",
        "title": "The She-Wolf",
        "artist": "Jackson Pollock",
        "year": "1943",
        "medium": "Oil, gouache, and plaster on canvas",
        "description": "In the early 1940s Pollock, like many of his peers, explored primeval or mythological themes in his work. The wolf in this painting may allude to the animal that suckled the twin founders of Rome, Romulus and Remus, in the myth of the city's birth. But 'She-Wolf came into existence because I had to paint it,' Pollock said in 1944.",
        "floor": "5",
        "room": "523",
        "gallery": "Alfred H. Barr, Jr. Galleries",
        "img": "https://www.moma.org/media/W1siZiIsIjIwMzA5OCJdLFsicCIsImNvbnZlcnQiLCItcXVhbGl0eSA5MCAtcmVzaXplIDIwMDB4MTQ0MFx1MDAzZSJdXQ.jpg?sha=944b62487ec0bb94",
        "alt_text": "Jackson Pollock's painting, The She Wolf"
    },
    "2": {
        "id": "2",
        "title": "Number 1A, 1948",
        "artist": "Jackson Pollock",
        "year": "1948",
        "medium": "Oil and enamel print on canvas",
        "description": "While the style of 'drip' painting has become synonymous with the name Jackson Pollock, here the artist has autographed the work even more directly, with several handprints found at the composition's upper right. 'Sometimes I use a brush but often prefer using a stick. Sometimes I pour the paint straight out of the can. I like to use a dripping, fluid paint.' Working on the floor in a spacious converted barn on Long Island, Pollock moved away from traditional artist's oil paints and embraced lower viscosity commercial enamel paints.The fluidity of this paint allowed him to directly capture the movements of his entire body over the canvas. Around the same time, Pollock stopped giving his paintings evocative titles and began instead to number them. His wife, artist Lee Krasner, later explained, 'Numbers are neutral. They make people look at a painting for what it is pure painting.'",
        "floor": "4",
        "room": "403",
        "gallery": "The David Geffen Galleries",
        "img": "https://www.moma.org/media/W1siZiIsIjQ3NzIxMyJdLFsicCIsImNvbnZlcnQiLCItcXVhbGl0eSA5MCAtcmVzaXplIDIwMDB4MTQ0MFx1MDAzZSJdXQ.jpg?sha=4834185188c2db7e",
        "alt_text": "Number 1A, 1948 Jackson Pollock, 1948"
        
    },
    "3": {
        "id": "3",
        "title": "Stenographic Figure",
        "artist": "Jackson Pollock" ,
        "year": "c. 1942",
        "medium": "Oil on linen",
        "description": "Much of Pollock's early work is characterized by a somber palette and congested pictorial space, but Stenographic Figure is bright and airy. Reflecting, perhaps, his new relationship with painter Lee Krasner, it is often read as a reclining female whose head in profile is at the upper left, whose arms and hands are opened wide over a torso that stretches across the middle of the canvas, and whose legs and paw-like feet are spread across the right edge. Another possible interpretation is that there is an upright figure near the right edge of the canvas and another just left of center. To finish the painting, Pollock covered the surface with a layer of scratchy, calligraphic lines.",
        "floor": "4",
        "room": "401",
        "gallery": "The David Geffen Galleries",
        "img": "https://www.moma.org/media/W1siZiIsIjE1NjM1MCJdLFsicCIsImNvbnZlcnQiLCItcXVhbGl0eSA5MCAtcmVzaXplIDIwMDB4MTQ0MFx1MDAzZSJdXQ.jpg?sha=1d85efb771ce024c",
        "alt_text": "Stenographic Figure, Jackson Pollock, 1942"
    },
    "4": {
        "id": "4",
        "title": "The Song of Love",
        "artist": "Giorgio de Chirico",
        "year": "1914",
        "medium": "Oil on canvas",
        "description": "'M. Giorgio de Chirico has just bought a pink rubber glove' -- so wrote the French poet Guillaume Apollinaire in July of 1914, noting the purchase because, he went on to say, he knew the glove's appearance in de Chirico's paintings would add to the works' uncanny power. Implying human presence, as a mold of the hand, yet also inhuman, a clammily limp fragment distinctly unfleshlike in color, the glove in The Song of Love has an unsettling authority. Why is this surgical garment pinned to a board or canvas, alongside a plaster head copied from a classical statue, a relic of a noble vanished age? What is the meaning of the green ball? And what is the whole ensemble doing in the outdoor setting insinuated by the building and the passing train?",
        "floor": "5",
        "room": "444",
        "gallery": "The Alfred H. Barr, Jr. Galleries",
        "img": "https://www.moma.org/media/W1siZiIsIjE1MDkxNiJdLFsicCIsImNvbnZlcnQiLCItcXVhbGl0eSA5MCAtcmVzaXplIDIwMDB4MjAwMFx1MDAzZSJdXQ.jpg?sha=806e5bfe83a65e46",
        "alt_text": "The Song of Love, Giorgio de Chirico, 1914"  
    },
    "5": {
        "id": "5",
        "title": "Great Metaphysical Interior",
        "artist": "Giorgio de Chirico",
        "year": "1917",
        "medium": "Oil on canvas",
        "description": "A painting by de Chirico",
        "floor": "5",
        "room": "523",
        "gallery": "The Alfred H. Barr, Jr. Galleries",
        "img": "https://www.moma.org/media/W1siZiIsIjMyNDc0NCJdLFsicCIsImNvbnZlcnQiLCItcXVhbGl0eSA5MCAtcmVzaXplIDIwMDB4MTQ0MFx1MDAzZSJdXQ.jpg?sha=e953db69a8e6ab8e",
        "alt_text": "Great Metaphysical Interior, Giorgio de Chirico, 1917"
    },
    "6": {
        "id": "6",
        "title": "Les Demoiselles d'Avignon",
        "artist": "Pablo Picasso",
        "year": "1907",
        "medium": "Oil on canvas",
        "description": "Les Demoiselles d'Avignon marks a radical break from traditional composition and perspective in painting. It depicts five naked women composed of flat, splintered planes whose faces were inspired by Iberian sculpture and African masks. The compressed space they inhabit appears to project forward in jagged shards, while a slice of melon in the still life at the bottom of the composition teeters on an upturned tabletop. Picasso unveiled the monumental painting in his Paris studio after months of revision. The Avignon of the work's title is a reference to a street in Barcelona famed for its brothels.",
        "floor": "5",
        "room": "503",
        "gallery": "The Alfred H. Barr, Jr. Galleries",
        "img": "https://www.moma.org/media/W1siZiIsIjQzODQ1MiJdLFsicCIsImNvbnZlcnQiLCItcXVhbGl0eSA5MCAtcmVzaXplIDIwMDB4MTQ0MFx1MDAzZSJdXQ.jpg?sha=8b2a1c3992bba555",
        "alt_text": "Les Demoiselles d'Avignon, Pablo Picasso, 1907"
    },
    "7": {
        "id": "7",
        "title": "She-Goat",
        "artist": "Pablo Picasso",
        "year":"1950",
        "medium": "Bronze",
        "description": "Picasso's studio in the town of Vallauris, where he worked beginning in 1948, was next to a yard into which potters threw debris and pieces of metal and shards of ceramics. After deciding to sculpt a goat, Picasso searched the yard for discarded materials that could suggest parts of the animal's body. He crafted a skeleton with these objects, and filled out the sculpture with plaster. A wicker basket forms the goat's rib cage; two ceramic jugs were modified to serve as its udders. Flat palm fronds shape the slope of the goat's spine and the length of its snout, and metal scraps are used as structural units throughout.",
        "floor": "1",
        "room": "Sculpture Garden",
        "gallery": "The Abby Aldrich Rockefeller Sculpture Garden",
        "img": "https://www.pablopicasso.org/images/paintings/she-goat.jpg",
        "alt_text": "The She Goat, 1950 by Pablo Picasso"
    },
    "8": {
        "id": "8",
        "title": "Dance (I)",
        "artist": "Henri Matisse",
        "year": "1909",
        "medium": "Oil on canvas",
        "description": "Matisse created Dance (I) as a study for a painting commissioned by the Russian businessman and arts patron Sergei Shchukin. The final work and its pendant painting, (both completed in 1910), are housed in the collection of the Hermitage Museum in St. Petersburg. Dance (I) marks a moment in Matisse's career when he embraced a reductive approach to painting, seeking the expressive potentials of fundamental elements: line, color, and form.",
        "floor": "5",
        "room": "506",
        "gallery": "The Alfred H. Barr, Jr. Galleries",
        "img": "https://www.henrimatisse.org/images/gallery/the-dance.jpg",
        "alt_text": "The Dance by Henri Matisse",
    },
    "9": {
        "id": "9",
        "title": "Gourds",
        "artist": "Henri Matisse",
        "year": "1915-1916",
        "medium": "Oil on canvas",
        "description": "Describing Gourds in 1945, Matisse recalled that he had created 'a composition of objects that do not touch but nonetheless participate in the same intimacy.' Its surface reveals that he achieved this effect after repeatedly adjusting and transposing forms. The austerity and monumentality of the canvas are complementary to The Moroccans, also of 1916. These qualities may have helped Matisse develop the luminous aspects of the larger canvas. In Gourds, he explained, he began 'to use pure black as a color of light and not as a color of darkness.'",
        "floor": "5",
        "room": "506",
        "gallery": "The Alfred H. Barr, Jr. Galleries",
        "img": "https://www.moma.org/media/W1siZiIsIjE3MDIzNCJdLFsicCIsImNvbnZlcnQiLCItcXVhbGl0eSA5MCAtcmVzaXplIDIwMDB4MTQ0MFx1MDAzZSJdXQ.jpg?sha=9510ca9d804bae84",
        "alt_text": "Henri Matisse. Gourds. Issy-les-Moulineaux, 1915-16 (dated on painting  1916) | MoMA",
    },
    "10": {
        "id": "10",
        "title": "Self-Portrait with Cropped Hair",
        "artist": "Frida Kahlo",
        "year": "1940",
        "medium": "Oil on canvas",
        "description": "In this self-portrait, Kahlo has cast off the feminine attributes with which she often depicted herself, such as traditional embroidered Tehuana dresses or flowers in her hair and instead sports a loose-fitting man's suit and short-clipped haircut. Her high-heeled shoes and one dangling earring remain, however, along with her characteristic penetrating outward gaze. Locks of hair are strewn across the floor, a severed braid lies next to her chair, and the artist holds a pair of scissors across her lap. This androgynous persona may refer to Kahlo's own bisexuality, while the lyrics of a popular Mexican song that appear at top suggest the address of a lover: 'Look, if I loved you it was because of your hair. Now that you are without hair, I don't love you anymore.' Kahlo and her husband, the artist Diego Rivera, had divorced in late 1939, and the painting indicates both the violence of separation and a newfound autonomy: Kahlo vowed to support herself financially after her divorce by selling her own work.",
        "floor": "5",
        "room": "517",
        "gallery": "The Alfred H. Barr, Jr. Galleries",
        "img": "https://www.moma.org/media/W1siZiIsIjQ5NDA4NSJdLFsicCIsImNvbnZlcnQiLCItcXVhbGl0eSA5MCAtcmVzaXplIDIwMDB4MjAwMFx1MDAzZSJdXQ.jpg?sha=8e5f2e8b5844fd7b",
        "alt_text": "Frida Kahlo. Self-Portrait with Cropped Hair. 1940 | MoMA"
    },
    
}

most_visited = [
    ["1", 10],
    ["2", 15],
    ["3", 9],
    ["4", 8],
    ["5", 9],
    ["6", 6],
    ["7", 7],
    ["8", 3],
    ["9", 2],
    ["10", 1],
]

current_id = 11


@app.route("/")
def index():
    tmp_visited = heapq.nlargest(3, most_visited, lambda x: x[1])
    popular_art = []
    for elem in tmp_visited:
        popular_art.append(data[elem[0]])
    return render_template("index.html", popular_art=popular_art)

@app.route("/add", methods=["POST", "GET"])
def add():
    if request.method == 'POST':
        global data
        global current_id
        
        json_data = request.get_json()
        new_art = dict()
        new_art["id"] = str(current_id)
        new_art["title"] = json_data["title"]
        new_art["artist"] = json_data["artist"]
        new_art["year"] = json_data["year"]
        new_art["medium"] = json_data["medium"]
        new_art["description"] = json_data["description"]
        new_art["floor"] = json_data["floor"]
        new_art["room"] = json_data["room"]
        new_art["gallery"] = json_data["gallery"]
        new_art["img"] = json_data["img"]
        data[str(current_id)] = new_art
        current_id += 1
        return jsonify(id=new_art["id"])
    else: 
        return render_template("add.html")

search = ""
num_results = 0
results = dict()
results["artists"] = []
results["title"] = []
results["medium"] = []


@app.route("/search_results", methods=["POST", "GET"])
def search_results():
    if request.method == 'POST':
        global search
        global results
        global num_results
        num_results = 0
        results["artists"] = []
        results["title"] = []
        results["medium"] = []
        search = request.get_json()["search_term"]
        for key in data:
            artwork = data[key]
            if search.lower() in artwork["artist"].lower():
                results["artists"].append(artwork)
                num_results += 1
            if search.lower() in artwork["title"].lower():
                results["title"].append(artwork)
                num_results += 1
            if search.lower() in artwork["medium"].lower():
                results["medium"].append(artwork)
                num_results += 1
        return jsonify({'redirect': url_for("search_results")})
    else:
        return render_template("search_results.html", search_term = search, results = results, num_results = num_results)
    
    

@app.route("/view/<id>")
def view(id=None):
    ind = str(id)
    art = data[ind]
    from_artist = list()
    nearby_works = list()
    for key in data:
        artwork = data[key]
        if artwork["artist"] == art["artist"] and key != ind:
            from_artist.append(artwork)
        if artwork["floor"] == art["floor"] and key != ind:
            nearby_works.append(artwork)
    nmin = min(len(nearby_works), 3)
    amin = min(len(from_artist), 3)
    return render_template("view.html", art=art, nearby_works = nearby_works[:nmin], from_artist = from_artist[:amin])

@app.route("/edit/<id>", methods=["POST", "GET"])
def edit(id=None):
    if request.method == 'POST':
        json_data = request.get_json()
        art_id = json_data["id"]
        data[art_id]["id"] = json_data["id"]
        data[art_id]["title"] = json_data["title"]
        data[art_id]["artist"] = json_data["artist"]
        data[art_id]["img"] = json_data["img"]
        data[art_id]["alt_text"] = json_data["alt_text"]
        data[art_id]["medium"] = json_data["medium"]
        data[art_id]["year"] = json_data["year"]
        data[art_id]["description"] = json_data["description"]
        data[art_id]["floor"] = json_data["floor"]
        data[art_id]["room"] = json_data["room"]
        data[art_id]["gallery"] = json_data["gallery"]
        return jsonify(art_id=art_id)
    else:
        ind = str(id)
        art = data[ind]
        return render_template("edit.html", art=art)


if __name__ == '__main__':
   app.run(debug = True)