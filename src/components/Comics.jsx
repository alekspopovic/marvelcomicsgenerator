import "../styles/Comics.scss";

export default function Comics({data}) {
    return <div className="comics">
        {data.map(comic => {
            const detailsURL = comic.urls.find(element => element["type"] === "detail"
        ).url

        return (
            <a key={comic.id} className="comicCard" style={{
                background: `url`
            }}>

            </a>
        )
        })}
    </div>
}