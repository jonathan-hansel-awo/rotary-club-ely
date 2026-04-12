import { revalidatePath } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret");

  if (secret !== process.env.SANITY_REVALIDATION_SECRET) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const documentType = body?._type;

    switch (documentType) {
      case "event":
        revalidatePath("/");
        revalidatePath("/events");
        revalidatePath("/events/[slug]", "page");
        break;
      case "newsPost":
        revalidatePath("/");
        revalidatePath("/news");
        revalidatePath("/news/[slug]", "page");
        break;
      case "contribution":
        revalidatePath("/");
        revalidatePath("/impact");
        revalidatePath("/impact/[slug]", "page");
        break;
      case "cause":
        revalidatePath("/");
        revalidatePath("/causes");
        revalidatePath("/causes/[slug]", "page");
        break;
      case "sponsor":
        revalidatePath("/");
        break;
      case "siteSettings":
        revalidatePath("/", "layout");
        break;
      case "clubMember":
        revalidatePath("/about");
        break;
      case "page":
        revalidatePath("/about");
        revalidatePath("/contact");
        break;
      default:
        revalidatePath("/");
    }

    return NextResponse.json({
      revalidated: true,
      type: documentType,
      now: Date.now(),
    });
  } catch (err) {
    return NextResponse.json(
      { message: "Error revalidating", err },
      { status: 500 },
    );
  }
}
