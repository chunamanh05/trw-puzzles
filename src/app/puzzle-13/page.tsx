import { redirect } from 'next/navigation';

export default function Puzzle13Redirect() {
  // Redirect từ base URL sang default locale (English)
  redirect('/puzzle-13/en');
}
