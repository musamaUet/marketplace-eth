import { Hero } from "@components/ui/common"
import { CourseCard, CourseList } from "@components/ui/course";
import { BaseLayout } from "@components/ui/layout";
import { OrderCard } from "@components/ui/order";
import { EthRates, WalletBar } from "@components/ui/web3";
import { getAllCourses } from "@content/courses/fetcher";
import { useWeb3 } from "@components/providers";

export default function Home(props) {
  const { courses } = props;
  const web3Api = useWeb3();
  
  return (
    <>
      <Hero />
      <CourseList courses={courses}>
      {course => <CourseCard key={course.id} course={course} />}
      </CourseList>
    </>
  );
}

export function getStaticProps() {
  const { data } = getAllCourses();
  return {
    props: { courses: data }
  }
}

Home.Layout = BaseLayout