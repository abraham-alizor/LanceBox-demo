import {SvgIcon} from '@/assets/SvgIcon';
import {AppNavigationProps} from '@/navigations/types';
import {Box} from '@/shared/components/Box';
import {ScrollBox} from '@/shared/components/ScrollBox';
import {Text} from '@/shared/components/Typography';
import MainLayout from '@/shared/layout/MainLayout';
import React, {FC, useCallback, useState} from 'react';
import * as yup from 'yup';
import {PrimaryButton} from '@/shared/components/Buttons/PrimaryButton';
import SelectInput from '@/shared/components/SelectInput/Index';
import {DateInput} from '@/shared/components/DateTimePicker';
import SimpleInput from '@/shared/components/TextInput/SimpleInput';
import {useFocusEffect} from '@react-navigation/native';
import {yupResolver} from '@hookform/resolvers/yup';
import {useForm} from 'react-hook-form';
import useStatusModal from '@/hooks/StatusModal';
import {TouchableOpacity} from '@/shared/components/TouchableOpacity';
import {useInvoiceStore} from '../../store/index';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

// Validation schema for Step 1
const step1Schema = yup.object().shape({
  clientName: yup.string().required("Client's Name is required"),
  yourName: yup.string().required('Your Name is required'),
  insuranceDate: yup.date(),
  currency: yup.string().required('Currency is required'),
  invoiceTitle: yup.string().required('Invoice Title is required'),
  itemDescription: yup.string().required('Item Description is required'),
  quantity: yup
    .number()
    .required('Quantity is required')
    .positive('Quantity must be positive'),
  price: yup
    .number()
    .required('Unit Price is required')
    .positive('Unit Price must be positive'),
  amount: yup
    .number()
    .required('Amount is required')
    .positive('Amount must be positive'),
});

// Validation schema for Step 2
const step2Schema = yup.object().shape({
  bankNumber: yup.string().required('Bank Number is required'),
  bankName: yup.string().required('Bank Name is required'),
  accountName: yup.string().required('Account Name is required'),
  paymentTerms: yup.string().required('Payment Terms are required'),
});
// .concat(step1Schema);
// Currency options
const CURRENCY_LIST = [
  {id: 'usd', value: 'USD'},
  {id: 'eur', value: 'EUR'},
  {id: 'gbp', value: 'GBP'},
];

const AddNewInvoice: FC<AppNavigationProps<'DashboardScreen'>> = ({
  navigation,
}) => {
  const {openStatusModal} = useStatusModal();
  const [stepForm, setStepForm] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const {
    bankInfo,
    clientInfo,
    invoiceItems,
    setBankInfo,
    setClientInfo,
    addInvoiceItem,
    removeInvoiceItem,
    resetForm,
  } = useInvoiceStore();

  const {
    control: step1Control,
    handleSubmit: handleStep1Submit,
    formState: {errors: step1Errors},
    watch: watchStep1,
    setValue: setStep1Value,
    reset: resetStep1,
  } = useForm({
    resolver: yupResolver(step1Schema),
    defaultValues: {
      clientName: clientInfo?.clientName || '',
      yourName: clientInfo?.yourName || '',
      insuranceDate: clientInfo?.insuranceDate || undefined,
      currency: clientInfo?.currency || '',
      invoiceTitle: '',
      itemDescription: '',
      quantity: undefined,
      price: undefined,
      amount: undefined,
    },
  });

  const {
    control: step2Control,
    handleSubmit: handleStep2Submit,
    formState: {errors: step2Errors},
    reset: resetStep2,
  } = useForm({
    resolver: yupResolver(step2Schema),
    defaultValues: {
      bankNumber: '',
      bankName: '',
      accountName: '',
      paymentTerms: '',
    },
  });

  // Reset forms on screen focus change
  useFocusEffect(
    useCallback(() => {
      return () => {
        resetStep1();
        resetStep2();
        resetForm();
      };
    }, [resetStep1, resetStep2, resetForm]),
  );

  const onSubmitStep1 = async data => {
    try {
      setIsLoading(true);
      setClientInfo({
        clientName: data.clientName,
        currency: data.currency,
        insuranceDate: data.insuranceDate,
        yourName: data.yourName,
      });
      addInvoiceItem({
        amount: data.amount,
        currency: data.currency,
        invoiceTitle: data.invoiceTitle,
        itemDescription: data.itemDescription,
        price: data.price,
        quantity: data.quantity,
      });
      setStepForm(2);
    } catch (error) {
      console.error('Step 1 Submission Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmitStep2 = async data => {
    console.log(1);
    try {
      console.log(2);

      setIsLoading(true);
      setBankInfo({
        accountName: data.accountName,
        bankName: data.bankName,
        bankNumber: data.bankNumber,
        paymentTerms: data.paymentTerms,
      });
      navigation.navigate('PreviewScreen');
    } catch (error) {
      console.error('Step 2 Submission Error:', error);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };
  const handleAddItem = () => {
    const quantity = watchStep1('quantity');
    const price = watchStep1('price');
    const itemData = {
      itemDescription: watchStep1('itemDescription'),
      quantity,
      price,
      amount: quantity * price, // Calculate amount automatically
      currency: watchStep1('currency'),
      invoiceTitle: watchStep1('invoiceTitle'),
    };

    if (
      itemData.itemDescription &&
      itemData.quantity &&
      itemData.price &&
      itemData.amount
    ) {
      addInvoiceItem(itemData);

      // Reset item fields
      setStep1Value('itemDescription', '');
      setStep1Value('quantity', undefined);
      setStep1Value('price', undefined);
      setStep1Value('amount', undefined);
    } else {
      openStatusModal({
        type: 'error',
        message: 'Please fill in all item details',
      });
    }
  };

  const handleRemoveItem = (index: number) => {
    removeInvoiceItem(index);
  };

  // Calculate totals
  const calculateSubtotal = (items: any[]) => {
    return items.reduce((total, item) => total + item.quantity * item.price, 0);
  };

  const calculateVat = (vatRate = 0.1) => {
    return calculateSubtotal(invoiceItems) * vatRate;
  };

  const calculateShipping = (shippingRate = 50) => {
    return calculateSubtotal(invoiceItems) > 0 ? shippingRate : 0;
  };

  const calculateTotal = () => {
    return (
      calculateSubtotal(invoiceItems) + calculateVat() + calculateShipping()
    );
  };

  return (
    <MainLayout HeaderTitle={'Dashboard'}>
      <ScrollBox showsVerticalScrollIndicator={false}>
        <KeyboardAwareScrollView
          extraHeight={180}
          showsVerticalScrollIndicator={false}>
          {stepForm === 1 && (
            <>
              <Box>
                <Text variant={'bold16'}>New Invoice</Text>
                <Box
                  marginHorizontal={'sm'}
                  marginTop={'md'}
                  columnGap={'md'}
                  flexDirection={'row'}
                  justifyContent={'space-between'}
                  alignItems={'center'}>
                  <Box maxWidth={'15%'}>
                    <Text variant={'regular10'}>Invoice Details</Text>
                  </Box>
                  <Box maxWidth={'4%'}>
                    <Text variant={'regular12'}>{'>'}</Text>
                  </Box>
                  <Box maxWidth={'15%'}>
                    <Text variant={'regular10'} color={'gray400'}>
                      Bank Details
                    </Text>
                  </Box>
                  <Box maxWidth={'4%'}>
                    <Text variant={'regular12'} color={'gray400'}>
                      {'>'}
                    </Text>
                  </Box>
                  <Box maxWidth={'15%'}>
                    <Text variant={'regular10'} color={'gray400'}>
                      Preview Invoice
                    </Text>
                  </Box>
                  <Box maxWidth={'4%'}>
                    <Text variant={'regular12'} color={'gray400'}>
                      {'>'}
                    </Text>
                  </Box>
                  <Box maxWidth={'15%'}>
                    <Text variant={'regular10'} color={'gray400'}>
                      Download Invoice
                    </Text>
                  </Box>
                  <Box maxWidth={'4%'}>
                    <Text variant={'regular12'} color={'gray400'}>
                      {'>'}
                    </Text>
                  </Box>
                  <Box maxWidth={'4%'}>
                    <SvgIcon name="checkCircle" size="mm" />
                  </Box>
                </Box>
              </Box>

              <Box>
                <Box marginTop="lg" width={'50%'}>
                  <Text marginBottom={'sm'}>Client's Name</Text>
                  <SimpleInput
                    control={step1Control}
                    name="clientName"
                    error={step1Errors.clientName?.message}
                    borderColor="gray200"
                    labelColor="black"
                    inputProps={{
                      placeholder: "Enter Client's Name",
                      placeholderTextColor: '#9ca3af',
                    }}
                  />
                </Box>

                <Box marginTop="md">
                  <Text marginBottom={'sm'}>Your Name</Text>
                  <SimpleInput
                    control={step1Control}
                    name="yourName"
                    error={step1Errors.yourName?.message}
                    borderColor="gray200"
                    labelColor="black"
                    inputProps={{
                      placeholder: 'Enter Your Name',
                      placeholderTextColor: '#9ca3af',
                    }}
                  />
                </Box>
                <Box
                  flexDirection={'row'}
                  justifyContent={'space-between'}
                  alignItems={'center'}>
                  <Box marginTop="md" width={'48%'}>
                    <Text marginBottom={'sm'}>Insurance Date</Text>
                    <DateInput
                      control={step1Control}
                      name="insuranceDate"
                      errorMessage={step1Errors.insuranceDate?.message}
                      getSelectedDate={date =>
                        setStep1Value('insuranceDate', date)
                      }
                      maximumDate={new Date()}
                    />
                  </Box>

                  <Box marginTop="lg" width={'48%'}>
                    <Text>Currency</Text>
                    <SelectInput
                      borderColor="gray200"
                      title="Select Currency"
                      items={CURRENCY_LIST}
                      name="currency"
                      control={step1Control}
                      placeholder="Choose currency"
                      errorMessage={step1Errors.currency?.message}
                    />
                  </Box>
                </Box>
                <Box>
                  {invoiceItems?.map((item, index) => (
                    <Box marginTop="md">
                      <Box
                        key={index}
                        flexDirection={'row'}
                        justifyContent={'space-between'}
                        flexWrap="wrap">
                        <Box width={'48%'}>
                          <Text marginBottom={'sm'}>Title</Text>

                          <Box
                            paddingHorizontal={'md'}
                            borderRadius={'sm'}
                            paddingVertical={'md'}
                            borderWidth={1}
                            borderColor={'gray400'}>
                            <Text>{item.invoiceTitle}</Text>
                          </Box>
                        </Box>
                        <Box width={'48%'}>
                          <Text marginBottom={'sm'}>Item Description</Text>

                          <Box
                            paddingHorizontal={'md'}
                            borderRadius={'sm'}
                            paddingVertical={'md'}
                            borderWidth={1}
                            borderColor={'gray400'}>
                            <Text>{item.itemDescription}</Text>
                          </Box>
                        </Box>
                        <Box width={'48%'}>
                          <Text marginBottom={'sm'}>Unit Price</Text>

                          <Box
                            paddingHorizontal={'md'}
                            borderRadius={'sm'}
                            paddingVertical={'md'}
                            borderWidth={1}
                            borderColor={'gray400'}>
                            <Text>{item.price}</Text>
                          </Box>
                        </Box>
                        <Box>
                          <Text marginBottom={'sm'}> Quantity</Text>

                          <Box
                            paddingHorizontal={'md'}
                            borderRadius={'sm'}
                            paddingVertical={'md'}
                            borderWidth={1}
                            borderColor={'gray400'}>
                            <Text>{item.quantity}</Text>
                          </Box>
                        </Box>
                      </Box>

                      <TouchableOpacity
                        onPress={() => handleRemoveItem(index)}
                        backgroundColor={'red200'}
                        padding={'sm'}
                        marginTop={'sm'}
                        flexDirection={'row'}
                        justifyContent={'center'}
                        alignItems={'center'}>
                        <Text>Remove</Text>
                      </TouchableOpacity>
                    </Box>
                  ))}
                </Box>

                <Text marginTop="md" variant={'semiBold16'}>
                  Invoice Details
                </Text>
                <Box marginTop="md">
                  <Text marginBottom={'sm'}>Invoice Title</Text>
                  <SimpleInput
                    control={step1Control}
                    name="invoiceTitle"
                    error={step1Errors.invoiceTitle?.message}
                    borderColor="gray200"
                    labelColor="black"
                    inputProps={{
                      placeholder: 'Enter Invoice Title',
                      placeholderTextColor: '#9ca3af',
                    }}
                  />
                </Box>

                <Box marginTop="md">
                  <Text marginBottom={'sm'}>Item Description</Text>
                  <SimpleInput
                    control={step1Control}
                    name="itemDescription"
                    error={step1Errors.itemDescription?.message}
                    borderColor="gray200"
                    labelColor="black"
                    inputProps={{
                      placeholder: 'Enter Item Description',
                      placeholderTextColor: '#9ca3af',
                    }}
                  />
                </Box>

                <Box
                  marginTop="md"
                  flexDirection={'row'}
                  justifyContent={'space-between'}>
                  <Box width={'48%'}>
                    <Text marginBottom={'sm'}>Quantity</Text>
                    <SimpleInput
                      control={step1Control}
                      name="quantity"
                      error={step1Errors.quantity?.message}
                      borderColor="gray200"
                      labelColor="black"
                      inputProps={{
                        placeholder: 'e.g., 2.00',
                        placeholderTextColor: '#9ca3af',
                        keyboardType: 'number-pad',
                      }}
                    />
                  </Box>
                  <Box width={'48%'}>
                    <Text marginBottom={'sm'}>Unit Price</Text>
                    <SimpleInput
                      control={step1Control}
                      name="price"
                      error={step1Errors.price?.message}
                      borderColor="gray200"
                      labelColor="black"
                      inputProps={{
                        placeholder: 'e.g., 3,000,000.00',
                        placeholderTextColor: '#9ca3af',
                        keyboardType: 'numeric',
                      }}
                    />
                  </Box>
                </Box>
                <Box
                  marginTop="md"
                  flexDirection={'row'}
                  justifyContent={'space-between'}
                  alignItems={'flex-end'}>
                  <Box width={'75%'}>
                    <Text marginBottom={'sm'}>Amount</Text>
                    <SimpleInput
                      control={step1Control}
                      name="amount"
                      error={step1Errors.amount?.message}
                      borderColor="gray200"
                      labelColor="black"
                      inputProps={{
                        placeholder: 'e.g., 2.00',
                        placeholderTextColor: '#9ca3af',
                        keyboardType: 'numeric',
                      }}
                    />
                  </Box>

                  <TouchableOpacity width={'20%'}>
                    <SvgIcon name="trash" size="xl" />
                  </TouchableOpacity>
                </Box>

                <TouchableOpacity onPress={handleAddItem} marginTop={'md'}>
                  <Text color={'primary'}>Add New Item</Text>
                </TouchableOpacity>

                <Box marginTop={'lg'}>
                  <Box
                    marginBottom={'md'}
                    flexDirection={'row'}
                    justifyContent={'space-between'}
                    alignItems={'center'}>
                    <Text>SubTotal</Text>
                    <Text variant={'semiBold18'}>
                      {calculateSubtotal(invoiceItems)}
                    </Text>
                  </Box>
                  <Box
                    marginBottom={'md'}
                    flexDirection={'row'}
                    justifyContent={'space-between'}
                    alignItems={'center'}>
                    <Text>VAT</Text>
                    <Text variant={'semiBold18'}>{calculateVat()}</Text>
                  </Box>
                  <Box
                    marginBottom={'md'}
                    flexDirection={'row'}
                    justifyContent={'space-between'}
                    alignItems={'center'}>
                    <Text>Shipping</Text>
                    <Text variant={'semiBold18'}> {calculateShipping()}</Text>
                  </Box>
                  <Box
                    marginBottom={'md'}
                    flexDirection={'row'}
                    justifyContent={'space-between'}
                    alignItems={'center'}>
                    <Text>Total</Text>
                    <Text variant={'semiBold18'}>{calculateTotal()}</Text>
                  </Box>
                </Box>

                <PrimaryButton
                  //   disabled={invoiceItems?.length < 1}
                  isLoading={isLoading}
                  alignItems="center"
                  justifyContent="center"
                  label={'NEXT'}
                  labelProps={{color: 'white'}}
                  labelVariant="medium14"
                  loadingIconColor="black"
                  marginTop="md"
                  onPress={handleStep1Submit(onSubmitStep1)}
                  paddingVertical="mmd"
                />
              </Box>
            </>
          )}

          {stepForm === 2 && (
            <>
              {/* Step 2: Bank Details */}
              <Box>
                <Text variant={'bold16'}>Bank Details</Text>
                <Box
                  marginHorizontal={'sm'}
                  marginTop={'md'}
                  columnGap={'md'}
                  flexDirection={'row'}
                  justifyContent={'space-between'}
                  alignItems={'center'}>
                  <Box maxWidth={'15%'}>
                    <Text variant={'regular10'} color={'gray400'}>
                      Invoice Details
                    </Text>
                  </Box>
                  <Box maxWidth={'4%'}>
                    <Text variant={'regular12'} color={'gray400'}>
                      {'>'}
                    </Text>
                  </Box>
                  <Box maxWidth={'15%'}>
                    <Text variant={'regular10'}>Bank Details</Text>
                  </Box>
                  <Box maxWidth={'4%'}>
                    <Text variant={'regular12'}>{'>'}</Text>
                  </Box>
                  <Box maxWidth={'15%'}>
                    <Text variant={'regular10'} color={'gray400'}>
                      Preview Invoice
                    </Text>
                  </Box>
                  <Box maxWidth={'4%'}>
                    <Text variant={'regular12'} color={'gray400'}>
                      {'>'}
                    </Text>
                  </Box>
                  <Box maxWidth={'15%'}>
                    <Text variant={'regular10'} color={'gray400'}>
                      Download Invoice
                    </Text>
                  </Box>
                  <Box maxWidth={'4%'}>
                    <Text variant={'regular12'} color={'gray400'}>
                      {'>'}
                    </Text>
                  </Box>
                  <Box maxWidth={'4%'}>
                    <SvgIcon name="checkCircle" size="mm" />
                  </Box>
                </Box>
              </Box>

              <Box marginTop={'lg'}>
                <Box marginTop="md">
                  <Text marginBottom={'sm'}>Bank Number</Text>
                  <SimpleInput
                    control={step2Control}
                    name="bankNumber"
                    error={step2Errors.bankNumber?.message}
                    borderColor="gray200"
                    labelColor="black"
                    inputProps={{
                      placeholder: 'Enter Bank Number',
                      placeholderTextColor: '#9ca3af',
                    }}
                  />
                </Box>

                <Box marginTop="md">
                  <Text marginBottom={'sm'}>Name of Bank</Text>
                  <SimpleInput
                    control={step2Control}
                    name="bankName"
                    error={step2Errors.bankName?.message}
                    borderColor="gray200"
                    labelColor="black"
                    inputProps={{
                      placeholder: 'Enter Bank Name',
                      placeholderTextColor: '#9ca3af',
                    }}
                  />
                </Box>

                <Box marginTop="md">
                  <Text marginBottom={'sm'}>Name of Account</Text>
                  <SimpleInput
                    control={step2Control}
                    name="accountName"
                    error={step2Errors.accountName?.message}
                    borderColor="gray200"
                    labelColor="black"
                    inputProps={{
                      placeholder: 'Enter Account Name',
                      placeholderTextColor: '#9ca3af',
                    }}
                  />
                </Box>

                <Box marginTop="md">
                  <Text marginBottom={'sm'}>Terms of Payment</Text>
                  <SimpleInput
                    control={step2Control}
                    name="paymentTerms"
                    error={step2Errors.paymentTerms?.message}
                    borderColor="gray200"
                    labelColor="black"
                    inputProps={{
                      placeholder: 'Enter Payment Terms',
                      placeholderTextColor: '#9ca3af',
                    }}
                  />
                </Box>

                <PrimaryButton
                  isLoading={isLoading}
                  alignItems="center"
                  justifyContent="center"
                  label={'PREVIEW INVOICE'}
                  labelProps={{color: 'white'}}
                  labelVariant="medium14"
                  loadingIconColor="black"
                  marginTop="md"
                  onPress={handleStep2Submit(onSubmitStep2)}
                  paddingVertical="mmd"
                />
              </Box>
            </>
          )}
        </KeyboardAwareScrollView>
      </ScrollBox>
    </MainLayout>
  );
};

export default AddNewInvoice;
