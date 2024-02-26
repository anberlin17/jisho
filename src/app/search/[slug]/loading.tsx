import Skeleton from '@/ui/skeleton'

export default function Loading() {
  return (
    <section className="search-results search-results_skeleton">
      {[...Array(5).keys()].map((_, idx) => (
        <div className="lexeme lexeme_skeleton" key={idx}>
          <Skeleton
            className="lexeme__view-container"
            variant="rounded"
            animation="wave"
            width={200}
            height={70}
          />
          <div className="lexeme__meanings">
            <Skeleton variant="text" animation="wave" />
            <Skeleton variant="text" animation="wave" />
            <Skeleton variant="text" animation="wave" />
          </div>
        </div>
      ))}
    </section>
  )
}
