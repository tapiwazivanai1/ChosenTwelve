import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import {
  Settings,
  CreditCard,
  Mail,
  Shield,
  Bell,
  Smartphone,
  Globe,
  Save,
  Trash,
  Plus,
} from "lucide-react";

// General settings form schema
const generalSettingsSchema = z.object({
  churchName: z.string().min(2, { message: "Church name is required" }),
  churchEmail: z.string().email({ message: "Invalid email address" }),
  churchPhone: z.string().min(1, { message: "Phone number is required" }),
  churchAddress: z.string().min(1, { message: "Address is required" }),
  churchWebsite: z.string().url({ message: "Invalid website URL" }),
  churchLogo: z.string().optional(),
  defaultCurrency: z.string().min(1, { message: "Currency is required" }),
});

// Payment settings form schema
const paymentSettingsSchema = z.object({
  enablePaypal: z.boolean(),
  paypalClientId: z.string().optional(),
  paypalSecret: z.string().optional(),
  enableMobileMoney: z.boolean(),
  mobileMoneyApiKey: z.string().optional(),
  enableBankTransfer: z.boolean(),
  bankName: z.string().optional(),
  bankAccountNumber: z.string().optional(),
  bankAccountName: z.string().optional(),
});

// Notification settings form schema
const notificationSettingsSchema = z.object({
  enableEmailNotifications: z.boolean(),
  emailServiceProvider: z.string().optional(),
  emailApiKey: z.string().optional(),
  emailFromAddress: z.string().email().optional(),
  enableSmsNotifications: z.boolean(),
  smsServiceProvider: z.string().optional(),
  smsApiKey: z.string().optional(),
  smsFromNumber: z.string().optional(),
});

// Security settings form schema
const securitySettingsSchema = z.object({
  requireEmailVerification: z.boolean(),
  requireAdminApproval: z.boolean(),
  passwordMinLength: z.string(),
  passwordRequireSpecialChar: z.boolean(),
  passwordRequireNumber: z.boolean(),
  passwordRequireUppercase: z.boolean(),
  sessionTimeout: z.string(),
});

const AdminSettings = () => {
  const [activeTab, setActiveTab] = useState("general");
  const [isPaymentMethodDialogOpen, setIsPaymentMethodDialogOpen] =
    useState(false);

  // Sample payment methods
  const [paymentMethods, setPaymentMethods] = useState([
    {
      id: "payment-1",
      name: "PayPal",
      type: "paypal",
      enabled: true,
      details: {
        clientId: "sample-client-id",
        secret: "••••••••••••••••",
      },
    },
    {
      id: "payment-2",
      name: "Mobile Money",
      type: "mobile_money",
      enabled: true,
      details: {
        provider: "MTN Mobile Money",
        apiKey: "••••••••••••••••",
      },
    },
    {
      id: "payment-3",
      name: "Bank Transfer",
      type: "bank_transfer",
      enabled: true,
      details: {
        bankName: "First National Bank",
        accountNumber: "1234567890",
        accountName: "Guta Ra Mwari Church",
      },
    },
  ]);

  // General settings form
  const generalForm = useForm<z.infer<typeof generalSettingsSchema>>({
    resolver: zodResolver(generalSettingsSchema),
    defaultValues: {
      churchName: "Guta Ra Mwari Church",
      churchEmail: "info@gutaramwari.org",
      churchPhone: "+263 77 123 4567",
      churchAddress: "123 Main Street, Harare, Zimbabwe",
      churchWebsite: "https://www.gutaramwari.org",
      churchLogo: "https://example.com/logo.png",
      defaultCurrency: "USD",
    },
  });

  // Payment settings form
  const paymentForm = useForm<z.infer<typeof paymentSettingsSchema>>({
    resolver: zodResolver(paymentSettingsSchema),
    defaultValues: {
      enablePaypal: true,
      paypalClientId: "sample-client-id",
      paypalSecret: "sample-secret",
      enableMobileMoney: true,
      mobileMoneyApiKey: "sample-api-key",
      enableBankTransfer: true,
      bankName: "First National Bank",
      bankAccountNumber: "1234567890",
      bankAccountName: "Guta Ra Mwari Church",
    },
  });

  // Notification settings form
  const notificationForm = useForm<z.infer<typeof notificationSettingsSchema>>({
    resolver: zodResolver(notificationSettingsSchema),
    defaultValues: {
      enableEmailNotifications: true,
      emailServiceProvider: "SendGrid",
      emailApiKey: "sample-email-api-key",
      emailFromAddress: "notifications@gutaramwari.org",
      enableSmsNotifications: true,
      smsServiceProvider: "Twilio",
      smsApiKey: "sample-sms-api-key",
      smsFromNumber: "+1234567890",
    },
  });

  // Security settings form
  const securityForm = useForm<z.infer<typeof securitySettingsSchema>>({
    resolver: zodResolver(securitySettingsSchema),
    defaultValues: {
      requireEmailVerification: true,
      requireAdminApproval: true,
      passwordMinLength: "8",
      passwordRequireSpecialChar: true,
      passwordRequireNumber: true,
      passwordRequireUppercase: true,
      sessionTimeout: "30",
    },
  });

  const onGeneralSubmit = (data: z.infer<typeof generalSettingsSchema>) => {
    console.log("General settings updated:", data);
    // Here you would typically save the settings to your backend
  };

  const onPaymentSubmit = (data: z.infer<typeof paymentSettingsSchema>) => {
    console.log("Payment settings updated:", data);
    // Here you would typically save the settings to your backend
  };

  const onNotificationSubmit = (
    data: z.infer<typeof notificationSettingsSchema>,
  ) => {
    console.log("Notification settings updated:", data);
    // Here you would typically save the settings to your backend
  };

  const onSecuritySubmit = (data: z.infer<typeof securitySettingsSchema>) => {
    console.log("Security settings updated:", data);
    // Here you would typically save the settings to your backend
  };

  const togglePaymentMethod = (id: string) => {
    setPaymentMethods(
      paymentMethods.map((method) =>
        method.id === id ? { ...method, enabled: !method.enabled } : method,
      ),
    );
  };

  const deletePaymentMethod = (id: string) => {
    setPaymentMethods(paymentMethods.filter((method) => method.id !== id));
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Admin Settings</h2>
        <p className="text-muted-foreground">
          Configure system settings for the fundraising platform
        </p>
      </div>

      <Tabs
        defaultValue="general"
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-4">
          <TabsTrigger value="general" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            <span>General</span>
          </TabsTrigger>
          <TabsTrigger value="payment" className="flex items-center gap-2">
            <CreditCard className="h-4 w-4" />
            <span>Payment</span>
          </TabsTrigger>
          <TabsTrigger value="notification" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            <span>Notifications</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            <span>Security</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>
                Configure general information about your church
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...generalForm}>
                <form
                  onSubmit={generalForm.handleSubmit(onGeneralSubmit)}
                  className="space-y-4"
                >
                  <FormField
                    control={generalForm.control}
                    name="churchName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Church Name</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={generalForm.control}
                      name="churchEmail"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address</FormLabel>
                          <FormControl>
                            <Input type="email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={generalForm.control}
                      name="churchPhone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={generalForm.control}
                    name="churchAddress"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address</FormLabel>
                        <FormControl>
                          <Textarea {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={generalForm.control}
                      name="churchWebsite"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Website</FormLabel>
                          <FormControl>
                            <Input type="url" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={generalForm.control}
                      name="defaultCurrency"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Default Currency</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select currency" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="USD">USD ($)</SelectItem>
                              <SelectItem value="EUR">EUR (€)</SelectItem>
                              <SelectItem value="GBP">GBP (£)</SelectItem>
                              <SelectItem value="ZWL">
                                ZWL (Zimbabwe Dollar)
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={generalForm.control}
                    name="churchLogo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Church Logo URL</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormDescription>
                          Enter a URL for your church logo (optional)
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="mt-4">
                    Save General Settings
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payment">
          <Card>
            <CardHeader>
              <CardTitle>Payment Methods</CardTitle>
              <CardDescription>
                Configure payment methods for contributions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">
                    Available Payment Methods
                  </h3>
                  <Dialog
                    open={isPaymentMethodDialogOpen}
                    onOpenChange={setIsPaymentMethodDialogOpen}
                  >
                    <DialogTrigger asChild>
                      <Button size="sm" className="flex items-center gap-2">
                        <Plus className="h-4 w-4" /> Add Method
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add Payment Method</DialogTitle>
                        <DialogDescription>
                          Configure a new payment method for contributions
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <FormLabel>Payment Method Type</FormLabel>
                          <Select defaultValue="paypal">
                            <SelectTrigger>
                              <SelectValue placeholder="Select payment type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="paypal">PayPal</SelectItem>
                              <SelectItem value="mobile_money">
                                Mobile Money
                              </SelectItem>
                              <SelectItem value="bank_transfer">
                                Bank Transfer
                              </SelectItem>
                              <SelectItem value="credit_card">
                                Credit Card
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <FormLabel>Display Name</FormLabel>
                          <Input placeholder="e.g., PayPal" />
                        </div>
                        <div className="space-y-2">
                          <FormLabel>API Key / Client ID</FormLabel>
                          <Input placeholder="Enter API key or client ID" />
                        </div>
                        <div className="space-y-2">
                          <FormLabel>API Secret</FormLabel>
                          <Input
                            type="password"
                            placeholder="Enter API secret"
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button
                          onClick={() => setIsPaymentMethodDialogOpen(false)}
                        >
                          Add Payment Method
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>

                <div className="space-y-2">
                  {paymentMethods.map((method) => (
                    <div
                      key={method.id}
                      className="flex items-center justify-between p-4 border rounded-md"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex flex-col">
                          <span className="font-medium">{method.name}</span>
                          <span className="text-sm text-muted-foreground">
                            {method.type === "paypal"
                              ? `Client ID: ${method.details.clientId}`
                              : method.type === "mobile_money"
                                ? `Provider: ${method.details.provider}`
                                : `Bank: ${method.details.bankName}`}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-2">
                          <span className="text-sm">
                            {method.enabled ? "Enabled" : "Disabled"}
                          </span>
                          <Switch
                            checked={method.enabled}
                            onCheckedChange={() =>
                              togglePaymentMethod(method.id)
                            }
                          />
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => deletePaymentMethod(method.id)}
                        >
                          <Trash className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Payment Settings</CardTitle>
              <CardDescription>
                Configure general payment settings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...paymentForm}>
                <form
                  onSubmit={paymentForm.handleSubmit(onPaymentSubmit)}
                  className="space-y-4"
                >
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">PayPal Settings</h3>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <FormLabel>Enable PayPal</FormLabel>
                        <FormDescription>
                          Allow contributions via PayPal
                        </FormDescription>
                      </div>
                      <FormField
                        control={paymentForm.control}
                        name="enablePaypal"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                    {paymentForm.watch("enablePaypal") && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={paymentForm.control}
                          name="paypalClientId"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>PayPal Client ID</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={paymentForm.control}
                          name="paypalSecret"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>PayPal Secret</FormLabel>
                              <FormControl>
                                <Input type="password" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    )}
                  </div>

                  <div className="space-y-4 pt-4 border-t">
                    <h3 className="text-lg font-medium">
                      Mobile Money Settings
                    </h3>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <FormLabel>Enable Mobile Money</FormLabel>
                        <FormDescription>
                          Allow contributions via mobile money services
                        </FormDescription>
                      </div>
                      <FormField
                        control={paymentForm.control}
                        name="enableMobileMoney"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                    {paymentForm.watch("enableMobileMoney") && (
                      <FormField
                        control={paymentForm.control}
                        name="mobileMoneyApiKey"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Mobile Money API Key</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}
                  </div>

                  <div className="space-y-4 pt-4 border-t">
                    <h3 className="text-lg font-medium">
                      Bank Transfer Settings
                    </h3>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <FormLabel>Enable Bank Transfer</FormLabel>
                        <FormDescription>
                          Allow contributions via bank transfer
                        </FormDescription>
                      </div>
                      <FormField
                        control={paymentForm.control}
                        name="enableBankTransfer"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                    {paymentForm.watch("enableBankTransfer") && (
                      <div className="space-y-4">
                        <FormField
                          control={paymentForm.control}
                          name="bankName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Bank Name</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            control={paymentForm.control}
                            name="bankAccountNumber"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Account Number</FormLabel>
                                <FormControl>
                                  <Input {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={paymentForm.control}
                            name="bankAccountName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Account Name</FormLabel>
                                <FormControl>
                                  <Input {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  <Button type="submit" className="mt-4">
                    Save Payment Settings
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notification">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>
                Configure how notifications are sent to members
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...notificationForm}>
                <form
                  onSubmit={notificationForm.handleSubmit(onNotificationSubmit)}
                  className="space-y-6"
                >
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Email Notifications</h3>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <FormLabel>Enable Email Notifications</FormLabel>
                        <FormDescription>
                          Send notifications to members via email
                        </FormDescription>
                      </div>
                      <FormField
                        control={notificationForm.control}
                        name="enableEmailNotifications"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                    {notificationForm.watch("enableEmailNotifications") && (
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            control={notificationForm.control}
                            name="emailServiceProvider"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Email Service Provider</FormLabel>
                                <Select
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                >
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select provider" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="SendGrid">
                                      SendGrid
                                    </SelectItem>
                                    <SelectItem value="Mailchimp">
                                      Mailchimp
                                    </SelectItem>
                                    <SelectItem value="SMTP">SMTP</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={notificationForm.control}
                            name="emailApiKey"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>API Key</FormLabel>
                                <FormControl>
                                  <Input type="password" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <FormField
                          control={notificationForm.control}
                          name="emailFromAddress"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>From Email Address</FormLabel>
                              <FormControl>
                                <Input type="email" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    )}
                  </div>

                  <div className="space-y-4 pt-4 border-t">
                    <h3 className="text-lg font-medium">SMS Notifications</h3>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <FormLabel>Enable SMS Notifications</FormLabel>
                        <FormDescription>
                          Send notifications to members via SMS
                        </FormDescription>
                      </div>
                      <FormField
                        control={notificationForm.control}
                        name="enableSmsNotifications"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                    {notificationForm.watch("enableSmsNotifications") && (
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            control={notificationForm.control}
                            name="smsServiceProvider"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>SMS Service Provider</FormLabel>
                                <Select
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                >
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select provider" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="Twilio">
                                      Twilio
                                    </SelectItem>
                                    <SelectItem value="Vonage">
                                      Vonage
                                    </SelectItem>
                                    <SelectItem value="AfricasTalking">
                                      Africa's Talking
                                    </SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={notificationForm.control}
                            name="smsApiKey"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>API Key</FormLabel>
                                <FormControl>
                                  <Input type="password" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <FormField
                          control={notificationForm.control}
                          name="smsFromNumber"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>From Phone Number</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    )}
                  </div>

                  <Button type="submit" className="mt-4">
                    Save Notification Settings
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>
                Configure security settings for the platform
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...securityForm}>
                <form
                  onSubmit={securityForm.handleSubmit(onSecuritySubmit)}
                  className="space-y-6"
                >
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Account Security</h3>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <FormLabel>Require Email Verification</FormLabel>
                        <FormDescription>
                          Members must verify their email before accessing the
                          platform
                        </FormDescription>
                      </div>
                      <FormField
                        control={securityForm.control}
                        name="requireEmailVerification"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <FormLabel>Require Admin Approval</FormLabel>
                        <FormDescription>
                          New member accounts require admin approval
                        </FormDescription>
                      </div>
                      <FormField
                        control={securityForm.control}
                        name="requireAdminApproval"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <div className="space-y-4 pt-4 border-t">
                    <h3 className="text-lg font-medium">
                      Password Requirements
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={securityForm.control}
                        name="passwordMinLength"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Minimum Password Length</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select length" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="6">6 characters</SelectItem>
                                <SelectItem value="8">8 characters</SelectItem>
                                <SelectItem value="10">
                                  10 characters
                                </SelectItem>
                                <SelectItem value="12">
                                  12 characters
                                </SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={securityForm.control}
                        name="sessionTimeout"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Session Timeout (minutes)</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select timeout" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="15">15 minutes</SelectItem>
                                <SelectItem value="30">30 minutes</SelectItem>
                                <SelectItem value="60">60 minutes</SelectItem>
                                <SelectItem value="120">2 hours</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <FormLabel>Require Special Character</FormLabel>
                          <FormDescription>
                            Passwords must contain at least one special
                            character
                          </FormDescription>
                        </div>
                        <FormField
                          control={securityForm.control}
                          name="passwordRequireSpecialChar"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Switch
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <FormLabel>Require Number</FormLabel>
                          <FormDescription>
                            Passwords must contain at least one number
                          </FormDescription>
                        </div>
                        <FormField
                          control={securityForm.control}
                          name="passwordRequireNumber"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Switch
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <FormLabel>Require Uppercase Letter</FormLabel>
                          <FormDescription>
                            Passwords must contain at least one uppercase letter
                          </FormDescription>
                        </div>
                        <FormField
                          control={securityForm.control}
                          name="passwordRequireUppercase"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Switch
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  </div>

                  <Button type="submit" className="mt-4">
                    Save Security Settings
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminSettings;
