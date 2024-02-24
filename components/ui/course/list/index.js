import Image from 'next/image';
import Link from "next/link";

export default function List(props) {
  const { courses } = props;
  return (
    <section className="grid md:grid-cols-1 lg:grid-cols-2 gap-4 mb-5">
      {courses.map((course, idx) =>
        <div
          key={course.id}
          className="bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl"
        >
          <div className="flex h-full">
            <div className="flex h-full">
              <Image
                className="object-cover"
                layout='fixed'
                width="200"
                height="230"
                src={course.coverImage}
                alt={course.title} />
            </div>
            <div className="p-8">
              <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">{course.type}</div>
              <Link href={`/courses/${course.slug}`} className="block mt-1 text-lg leading-tight font-medium text-black hover:underline">
                  {course.title}
              </Link>
              <p className="mt-2 text-gray-500">{course.description}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}