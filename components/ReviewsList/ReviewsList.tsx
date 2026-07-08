import css from './ReviewsList.module.css';
import type { Review } from '@/types/nanny';

interface ReviewsListProps {
  reviews: Review[];
}

export default function ReviewsList({ reviews }: ReviewsListProps) {
  if (!reviews?.length) {
    return <p className={css.empty}>No reviews yet.</p>;
  }

  return (
    <ul className={css.list}>
      {reviews.map((review, index) => (
        <li className={css.item} key={`${review.reviewer}-${index}`}>
          <div className={css.head}>
            <span className={css.avatar} aria-hidden="true">
              {review.reviewer.charAt(0).toUpperCase()}
            </span>
            <div>
              <p className={css.name}>{review.reviewer}</p>
              <p className={css.rating}>
                <span className={css.star} aria-hidden="true">
                  ★
                </span>
                {review.rating.toFixed(1)}
              </p>
            </div>
          </div>
          <p className={css.comment}>{review.comment}</p>
        </li>
      ))}
    </ul>
  );
}
