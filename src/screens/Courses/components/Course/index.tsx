import cn from 'classnames';
import { ReactComponent as Heart } from 'assets/heart.svg';
import { Course as ICourse } from 'types/courses';
import styles from './styles.module.scss';

interface Props {
  course: ICourse;
  onToggleFavorite: (course: ICourse) => void;
}

export default function Course({ course, onToggleFavorite }: Props) {
  const { title, favorite, instructor_image_url, instructor_name } = course;
  return (
    <div className={styles.container}>
      <img
        alt={`Instructor: ${course.instructor_name}`}
        src={instructor_image_url}
        className={styles.picture}
      />
      <h4 className={styles.instructor}>{instructor_name}</h4>
      <p className={styles.title}>{title}</p>
      <button
        onClick={() => onToggleFavorite(course)}
        className={styles.favorite}
        type="button">
        <Heart
          className={cn(
            styles['favorite-icon'],
            favorite && styles['is-favorite'],
          )}
        />
      </button>
    </div>
  );
}
