import { CourseCard, CourseList } from "@components/ui/course"
import { BaseLayout } from "@components/ui/layout"
import { getAllCourses } from "@content/courses/fetcher"
import { useWalletInfo } from "@components/hooks/web3"
import { Button } from "@components/ui/common"
import { OrderModal } from "@components/ui/order"
import { useState } from "react"
import { MarketHeader } from "@components/ui/marketplace"
import { useWeb3 } from "@components/providers"

export default function Marketplace({courses}) {
  const { web3, contract } = useWeb3();
  const { canPurchaseCourse, account } = useWalletInfo();
  const [selectedCourse, setSelectedCourse] = useState(null);

  function padBytes(bytes, length) {
    const paddedBytes = new Uint8Array(length);
    const bytesLength = Math.min(bytes.length, length);
    paddedBytes.set(bytes.slice(0, bytesLength), length - bytesLength);
    return paddedBytes;
}

  const purchaseCourse = async (order) => {
    console.log('selected', selectedCourse);
    const hexCourseId = web3.utils.utf8ToHex(selectedCourse?.id)?.toString();
    // const hexCourseIdkk = web3.utils.soliditySha3({type:'bytes16', value: hexCourseId});
    const bytes = web3.utils.hexToBytes(hexCourseId);

    // Pad the bytes to bytes16 format (16 bytes)
    const bytes16 = padBytes(bytes, 16);

    console.log('hexCourseId', hexCourseId)
    const orderHash = web3.utils.soliditySha3(
      { type: "bytes16", value: hexCourseId },
      { type: "address", value: account.data }
    );
    console.log('email', order);
    const emailHash = web3.utils.sha3(String(order.email));

    const proof = web3.utils.soliditySha3(
      { type: 'bytes', value: emailHash },
      { type: 'bytes', value: orderHash }
    );

    const value = web3.utils.toWei(String(order.price), 'ether');
    console.log('value', value);


    try {
      const result = await contract.methods.purchaseCourse(bytes16, proof).send({
        from: account.data, value
      });
      console.log('result', result);
    } catch(err){
      console.log('purchase course error', err);
    }
    // const value = web3.utils.toWei(String(order.price))

    // try {
    //   const result = await contract.methods.purchaseCourse(
    //     hexCourseId,
    //     proof
    //   ).send({from: account.data, value})
    //   console.log(result)
    // } catch {
    //   console.error("Purchase course: Operation has failed.")
    // }
  }

  return (
    <>
      <div className="py-4">
        <MarketHeader />
      </div>
      <CourseList
        courses={courses}
      >
      {course =>
        <CourseCard
          key={course.id}
          course={course}
          disabled={!canPurchaseCourse}
          Footer={() =>
            <div className="mt-4">
              <Button
                onClick={() => setSelectedCourse(course)}
                disabled={!canPurchaseCourse}
                variant="lightPurple">
                Purchase
              </Button>
            </div>
          }
        />
      }
      </CourseList>
      {selectedCourse &&
        <OrderModal
          course={selectedCourse}
          onClose={() => setSelectedCourse(null)}
          onSubmit={purchaseCourse}
        />
      }
    </>
  )
}

export function getStaticProps() {
  const { data } = getAllCourses()
  return {
    props: {
      courses: data
    }
  }
}

Marketplace.Layout = BaseLayout