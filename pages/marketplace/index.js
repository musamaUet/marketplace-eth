import React, { useState } from "react"
import { CourseCard, CourseList } from "@components/ui/course"
import { BaseLayout } from "@components/ui/layout"
import { getAllCourses } from "@content/courses/fetcher"
import { EthRates, WalletBar } from "@components/ui/web3"
import { useWalletInfo } from "@components/hooks/web3"
import { Breadcrumbs, Button } from "@components/ui/common"
import { OrderModal } from "@components/ui/order"
import { useEthPrice } from "@components/hooks/useEthPrice"

export default function Marketplace({courses}) {
  const { account, network, canPurchaseCourse } = useWalletInfo();
  const { eth } = useEthPrice();

  const [selectedCourse, setSelectedCourse] = useState(null);

  return (
    <>
      <div className="pt-4">
        {network?.data}
        <WalletBar
          network={{
            data: network.data,
            target: network.target,
            isSupported: network.isSupported,
            hasInitialResponse: network.hasInitialResponse
          }}
          address={account.data}
        />
        <EthRates eth={eth.data} ethPerItem={eth.perItem} />
        <div className="flex flex-row-reverse py-4 px-4 sm:px-6 lg:px-8">
          <Breadcrumbs />
        </div>
      </div>
      <CourseList courses={courses}>
        {course => <CourseCard
            key={course.id} course={course}
            Footer={() =>
              <div className="mt-4">
                <Button
                  disabled={!canPurchaseCourse}
                  onClick={() => setSelectedCourse(course)}
                  variant="lightPurple"
                >
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