import {useRouter} from "next/router";

export default function Payment() {
    const router = useRouter();
    const sk = router.query.sk
    return(
        <div>
            {router.query.sk}
        </div>
    )
}