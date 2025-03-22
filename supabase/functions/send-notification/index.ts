// Follow this setup guide to integrate the Deno runtime into your application:
// https://deno.land/manual/examples/deploy_deno_apps

Deno.serve(async (req) => {
  // This is needed if you're planning to invoke your function from a browser.
  if (req.method === "OPTIONS") {
    return new Response("ok", {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers":
          "authorization, x-client-info, apikey, content-type",
      },
    });
  }

  try {
    const { notificationId, recipients, title, message, type } =
      await req.json();

    // Validate required fields
    if ((!notificationId && !title) || !message || !type) {
      throw new Error("Missing required fields");
    }

    // In a real implementation, you would integrate with email/SMS services here
    // For this example, we'll simulate successful notification sending

    // Create a response with the notification details
    const data = {
      success: true,
      notificationId,
      recipientsCount: recipients ? recipients.length : "all users",
      title: title || "Notification from database",
      type,
      timestamp: new Date().toISOString(),
      message: "Notification sent successfully",
    };

    return new Response(JSON.stringify(data), {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      status: 400,
    });
  }
});
